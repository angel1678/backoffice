<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserNotificationController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = (object) Auth::user();
        try {
            $notification = $user->notifications()
                ->where('id', $id)
                ->first();

            if (empty($notification)) {
                throw new \Exception('Notification empty.');
            }
            $notification->markAsRead();
            return response()->json(['success' => true], 201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
