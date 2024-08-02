<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function backSuccess(string $message)
    {
        return back()->with("message", [
            'detail' => $message,
            'type' => 'success',
        ]);
    }

    public function redirectWithMessage(string $routeName, string $message, string $type = 'success')
    {
        return redirect()
            ->route($routeName)
            ->with("message", [
                'detail' => $message,
                'type' => $type,
            ]);
    }

    public function backWarning(string $message)
    {
        return back()->with("message", [
            'detail' => $message,
            'type' => 'warn',
        ]);
    }
}
