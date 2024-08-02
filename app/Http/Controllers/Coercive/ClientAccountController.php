<?php

namespace App\Http\Controllers\Coercive;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Casts\CurrencyFormat;
use App\Models\CoerciveClient;
use App\Models\CoerciveAccount;
use App\Mail\CoerciveAccountMail;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use App\Models\CoerciveAccountHistory;
use App\Imports\CoerciveAccountsImport;

class ClientAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CoerciveClient $client, Request $request)
    {
        $user = (object) Auth::user();
        $stage = $request->input('stage');
        $search = $request->input('search', '');

        $stages = $client->stages()
            ->where('is_active', true)
            ->select('id as value', 'name as label')
            ->get();

        $options = [
            'stages' => $stages,
        ];

        $query = $client->accounts();
        $query->when($user->isNotAn('admin'), function ($query) use ($user) {
            $query->where('executive_id', $user->id);
        })->when(!empty($stage), function ($query) use ($stage) {
            $query->where('stage_id', $stage);
        })->when(!empty($search), function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('process', 'like', "%{$search}%")
                    ->orWhere('identification', 'like', "{$search}%")
                    ->orWhere('name', 'like', "%{$search}%");
            });
        })->where('client_id', $client->id)
            ->withCasts([
                'principal_amount' => CurrencyFormat::class
            ]);

        $accounts = $query->paginate(100);

        return Inertia::render('Coercive/Account/Index', [
            'client' => $client,
            'accounts' => $accounts,
            'options' => $options,
            'stage' => $stage,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(CoerciveClient $client)
    {
        $executives = User::whereIs('lawyer')
            ->select('id as value', 'name as label')
            ->get();

        return Inertia::render('Coercive/Account/Create', [
            'clientId' => $client->id,
            'executives' => $executives,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function batchStore(Request $request, CoerciveClient $client): RedirectResponse
    {
        $data = (object) $request->validate([
            'fileAccounts' => 'required',
            'executiveIds' => 'required|array',
        ]);

        $file = $request->file('fileAccounts');
        $import = new CoerciveAccountsImport($client->id);
        $import->import($file);

        if ($import->errors()->count() > 0) {
            return back()
                ->withErrors($import->errors()->toArray());
        }

        $accounts = $client->accounts()
            ->whereNull('executive_id')
            ->get();

        $executives = $data->executiveIds;

        $executiveCount = 0;
        foreach ($accounts as $account) {
            $account->executive_id = $executives[$executiveCount++];
            $account->save();

            if ($executiveCount == count($executives)) {
                $executiveCount = 0;
            }
        }

        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CoerciveClient $client, CoerciveAccount $account)
    {
        $account->mergeCasts(['principal_amount' => CurrencyFormat::class]);

        $stages = $client->stages()
            ->where('is_active', true)
            ->select('id as value', 'name as label')
            ->get();

        $options = array_merge(session('options', []), [
            'stages' => $stages
        ]);

        $contacts = $account->contacts()
            ->where('is_active', true)
            ->get();

        return Inertia::render('Coercive/Account/Edit', [
            'client' => $client,
            'account' => $account,
            'contacts' => $contacts,
            'options' => $options,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CoerciveClient $client, CoerciveAccount $account)
    {
        $user = (object) Auth::user();
        $url = url()->previous();
        $route = app('router')->getRoutes($url)->match(app('request')->create($url))->getName();
        $hasUpdate = false;

        DB::beginTransaction();
        try {
            if ($user->isAn('admin') && $route == 'coercive.clients.accounts.index') {
                $account->is_active = !$account->is_active;
                $account->save();
                $hasUpdate = true;
            }

            if ($route == 'coercive.clients.accounts.edit') {
                $data = (object) $request->validate([
                    'stageId' => 'required',
                    'name' => 'required',
                ]);

                $account->name = $data->name;
                $account->stage_id = $data->stageId;

                if ($account->isDirty()) {
                    $account->save();
                    $hasUpdate = true;

                    if (in_array($data->stageId, [2, 3])) {
                        $contact = $account->contacts()
                            ->where('is_active', true)
                            ->where('type_id', 4)
                            ->first();

                        if (!empty($contact)) {
                            Mail::to($contact->data->value)
                                ->send(new CoerciveAccountMail($data->stageId, $account));
                        }
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
