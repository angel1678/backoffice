<?php

namespace App\Http\Controllers\Coercive;

use App\Casts\CurrencyFormat;
use App\Http\Controllers\Controller;
use App\Imports\CoerciveAccountsImport;
use App\Mail\CoerciveAccountMail;
use App\Models\Client;
use App\Models\CoerciveAccount;
use App\Models\CoerciveAccountHistory;
use App\Models\CoerciveAccountStage;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $user = (object) Auth::user();
        $stage = $request->input('stage');
        $search = $request->input('search');

        $stages = CoerciveAccountStage::where('is_active', true)
            ->select('id as value', 'name as label')
            ->get();

        $options = [
            'stages' => $stages
        ];

        $query = CoerciveAccount::query();
        $query->when($user->isNotAn('admin'), function ($query) use ($user) {
            $query->where('executive_id', $user->id);
        })->when(!empty($stage), function ($query) use($stage) {
            $query->where('stage_id', $stage);
        })->when(!empty($search), function ($query) use($search) {
            $query->where(function ($query) use($search) {
                $query->where('process', 'like', "%{$search}%")
                    ->orWhere('identification', 'like', "{$search}%")
                    ->orWhere('name', 'like', "%{$search}%");
            });
        })->withCasts([
            'principal_amount' => CurrencyFormat::class
        ]);

        $accounts = $query->paginate(100);
        return Inertia::render('Coercive/Index', [
            'accounts' => $accounts,
            'options' => $options,
            'stage' => $stage,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = Client::where('is_active', true)
            ->select('id as value', 'name as label')
            ->get();
        $executives = User::whereIs('lawyer')
            ->select('id as value', 'name as label')
            ->get();

        return Inertia::render('Coercive/Create', [
            'clients' => $clients,
            'executives' => $executives,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function batchStore(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'clientId' => 'required',
            'fileAccounts' => 'required',
            'executiveIds' => 'required|array',
        ]);

        $file = $request->file('fileAccounts');
        $import = new CoerciveAccountsImport($data['clientId']);
        $import->import($file);

        if ($import->errors()->count() > 0) {
            return back()
                ->withErrors($import->errors()->toArray());
        }

        $accounts = CoerciveAccount::where('client_id', $data['clientId'])
            ->whereNull('executive_id')
            ->get();

        $executives = $data['executiveIds'];

        $executiveCount = 0;
        foreach ($accounts as $account) {
            $account->executive_id = $executives[$executiveCount++];
            $account->save();

            if ($executiveCount == count($executives)) {
                $executiveCount = 0;
            }
        }

        return redirect()->route('coercive.accounts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(CoerciveAccount $account)
    {
        $account->mergeCasts([
            'principal_amount' => CurrencyFormat::class,
        ]);

        $stages = CoerciveAccountStage::where('is_active', true)
            ->select('id as value', 'name as label')
            ->get();

        $options = session('options', []);
        $options = array_merge($options, [
            'stages' => $stages
        ]);

        $contacts = $account->contacts()
            ->where('is_active', true)
            ->get();

        return Inertia::render('Coercive/Show', [
            'account' => $account,
            'contacts' => $contacts,
            'options' => $options,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CoerciveAccount $account)
    {
        $user = (object) Auth::user();
        $url = url()->previous();
        $route = app('router')->getRoutes($url)->match(app('request')->create($url))->getName();
        $hasUpdate = false;

        DB::beginTransaction();
        try {
            if ($user->isAn('admin') && $route == 'coercive.accounts.index') {
                $account->is_active = !$account->is_active;
                $account->save();
                $hasUpdate = true;
            }

            if ($route == 'coercive.accounts.show') {
                $data = $request->validate([
                    'stageId' => 'required',
                    'name' => 'required',
                ]);

                $account->name = $data['name'];
                $account->stage_id = $data['stageId'];

                if ($account->isDirty()) {
                    $account->save();
                    $hasUpdate = true;

                    if (in_array($data['stageId'], [2, 3])) {
                        $contact = $account->contacts()
                            ->where('type_id', 4)
                            ->where('is_active', true)
                            ->first();

                        Mail::to($contact->data->value)
                                ->send(new CoerciveAccountMail($data['stageId'], $account));
                    }
                }
            }

            if ($hasUpdate) {
                CoerciveAccountHistory::create([
                    'coercive_account_id' => $account->id,
                    'fields' => $account->getChanges(),
                    'user_id' => $user->id,
                ]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
