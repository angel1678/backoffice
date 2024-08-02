<?php

namespace App\Http\Controllers\Judicial;

use App\Models\JudicialFile;
use App\Http\Controllers\Controller;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

class ShowDocumentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(JudicialFile $document)
    {
        $documentSelected = Gdrive::get("{$document->location}/{$document->name}");
        return back()->with('documentSelected', 'data:application/pdf;base64,' . base64_encode($documentSelected->file));
    }
}
