<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $typeNotification = session('typeNotification', 'unread');

        /** @var User */
        $user = Auth::user();

        $judicialNotification = $user?->notifications()
            ->when($typeNotification == 'unread', function ($query) {
                $query->whereNull('read_at');
            })
            ->when($typeNotification == 'read', function ($query) {
                $query->whereNotNull('read_at');
            })
            ->where('type', 'App\Notifications\JudicialActionNotification')
            ->get();

        return inertia('Judicial/Dashboard/Index', [
            'judicialNotification' => $judicialNotification,
            'typeNotification' => $typeNotification,
        ]);
    }
}
