<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use App\Models\Proceso;
use Illuminate\Http\Request;

class IndexCommentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Proceso $judicial)
    {
        $comments = $judicial->comments()->get();
        return back()->with('comments', $comments);
    }
}
