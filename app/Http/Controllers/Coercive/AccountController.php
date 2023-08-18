<?php

namespace App\Http\Controllers\Coercive;

use App\Http\Controllers\Controller;
use App\Imports\CoerciveAccountsImport;
use App\Models\Client;
use App\Models\CoerciveAccount;
use App\Models\CoerciveAccountStage;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $stage = $request->input('stage');

        $stages = CoerciveAccountStage::where('is_active', true)
            ->select('id as value', 'name as label')
            ->get();

        $options = [
            'stages' => $stages
        ];

        $query = CoerciveAccount::query();
        $query->when($user->isNotAn('admin'), function ($query) use ($user) {
            return $query->where('executive_id', $user->id);
        });

        $query->when($request->has('stage'), function ($query) use($stage) {
            return $query->where('stage_id', $stage);
        });

        $accounts = $query->paginate(100);
        return Inertia::render('Coercive/Index', [
            'accounts' => $accounts,
            'options' => $options,
            'stage' => $stage,
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
        $user = User::find(Auth::id());
        $url = url()->previous();
        $route = app('router')->getRoutes($url)->match(app('request')->create($url))->getName();

        if ($user->isAn('admin') && $route == 'coercive.accounts.index') {
            $account->is_active = !$account->is_active;
            $account->save();
        }

        if ($route == 'coercive.accounts.show') {
            $data = $request->validate([
                'stageId' => 'required',
            ]);
            $account->stage_id = $data['stageId'];
            $account->save();
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
