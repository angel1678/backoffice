<?php

namespace App\Http\Controllers\Configuration;

use App\Models\User;
use Illuminate\Support\Str;
use App\Mail\UserRegisterMail;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserRegisterConfigurationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(User $user)
    {
        DB::beginTransaction();
        try {
            $user->email_verified_at = null;
            $user->password = Hash::make(Str::random(24));
            $user->save();

            $email = env('APP_DEBUG') ? env('EMAIL_DEBUG') : $user->email;
            Mail::to($email)
                ->send(new UserRegisterMail($user));

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return back();
    }
}
