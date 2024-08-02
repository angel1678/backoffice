<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use App\Models\ProcesoDetalle;
use Illuminate\Http\Request;

class IndexDetailDocumentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ProcesoDetalle $judicialDetail)
    {
        $documents = $judicialDetail->files()->get();

        return back()->with('documents', $documents);
    }
}
