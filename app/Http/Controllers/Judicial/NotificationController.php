<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return back()->with('typeNotification', $request->input('notification'));
    }
}
