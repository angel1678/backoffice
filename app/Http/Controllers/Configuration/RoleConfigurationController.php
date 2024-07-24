<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Silber\Bouncer\Database\Role;

class RoleConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $models = User::with('roles')
            ->has('roles')
            ->select('users.*')
            ->get();

        $formOptions = session('formOptions');

        return inertia('Configuration/Role/Index', [
            'models' => $models,
            'formOptions' => $formOptions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::with('roles')
            ->has('roles', '=', 0)
            ->get()
            ->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name
            ]);

        $roles = Role::get()
            ->map(fn ($item) =>  ["{$item->name}" => false])
            ->flatMap(fn ($item) => $item);

        return back()
            ->with('formOptions', [
                'users' => $users,
                'roles' => $roles
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = (object) $request->validate([
            'userId' => ['required', 'exists:users,id'],
            'roles' => ['required', 'array'],
            'roles.admin' => ['boolean'],
            'roles.accountant' => ['boolean'],
            'roles.judicialHead' => ['boolean'],
            'roles.lawyer' => ['boolean'],
        ]);

        DB::beginTransaction();
        try {
            $user = User::find($data->userId);
            $roles = collect($data->roles)
                ->filter(fn ($value) => $value)
                ->keys()
                ->toArray();

            $user->assign($roles);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Role::leftJoin('assigned_roles', function ($query) use ($user) {
                $query->on('assigned_roles.role_id', '=', 'roles.id')
                    ->where('assigned_roles.entity_type', 'App\Models\User')
                    ->where('assigned_roles.entity_id', '=', $user->id);
            })
            ->select(
                'roles.name',
                DB::raw('case when assigned_roles.entity_id is null then false else true end as value')
            )
            ->get()
            ->map(fn ($item) =>  ["{$item->name}" => (bool) $item->value])
            ->flatMap(fn ($item) => $item);

        return back()
            ->with('formOptions', [
                'roles' => $roles
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = (object) $request->validate([
            'roles' => ['required', 'array'],
            'roles.admin' => ['boolean'],
            'roles.accountant' => ['boolean'],
            'roles.judicialHead' => ['boolean'],
            'roles.lawyer' => ['boolean'],
        ]);

        DB::beginTransaction();
        try {
            $roles = collect($data->roles)
                ->filter(fn ($value) => $value)
                ->keys()
                ->toArray();

            $user->roles()->detach();
            $user->assign($roles);
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
    public function destroy(User $user)
    {
        $user->roles()->detach();
        back();
    }
}
