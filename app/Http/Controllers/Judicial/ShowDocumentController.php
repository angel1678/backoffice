<?php

namespace App\Http\Controllers\Judicial;

use App\Models\JudicialFile;
use App\Http\Controllers\Controller;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

class ShowDocumentController extends Controller
{
    protected $extension = [
        'pdf' => 'data:application/pdf',
        'doc' => 'data:text/html',
        'docx' => 'data:text/html',
    ];

    /**
     * Handle the incoming request.
     */
    public function __invoke(JudicialFile $document)
    {
        $document = Gdrive::get("{$document->location}/{$document->name}");
        $file = $document->file;

        if ($document->ext === 'doc' || $document->ext === 'docx') {
            //TODO: Agregar la api para convertir word en html (Garofalo)
        }

        return back()->with('documentSelected', $this->extension[$document->ext] . ';base64,' . base64_encode($file));
    }
}
