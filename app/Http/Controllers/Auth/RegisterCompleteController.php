<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class RegisterCompleteController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $user = User::find($request->query('user'));

        if ($user->hasVerifiedEmail()) {
            abort(401);
        }

        return inertia('Auth/RegisterComplete', [
            'model' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = (object) $request->validate([
            'password' => ['required', 'confirmed'],
        ]);

        DB::beginTransaction();
        try {
            $user->password = Hash::make($data->password);
            $user->markEmailAsVerified();
            $user->save();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return response()->redirectToRoute('dashboard');
    }
}
