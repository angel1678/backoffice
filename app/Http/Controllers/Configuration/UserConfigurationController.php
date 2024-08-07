<?php

namespace App\Http\Controllers\Configuration;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\UserRegisterMail;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $models = User::get();

        return inertia('Configuration/User/Index', [
            'models' => $models,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = (object) $request->validate([
            'name' => ['required', 'string'],
            'nickname' => ['required','string'],
            'email'=> ['required', 'email'],
        ]);

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $data->name,
                'nickname' => $data->nickname,
                'email'=> $data->email,
                'password' => Hash::make(Str::random(24)),
            ]);;

            Mail::to($user->email)
                ->send(new UserRegisterMail($user));

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
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return back();
    }
}
