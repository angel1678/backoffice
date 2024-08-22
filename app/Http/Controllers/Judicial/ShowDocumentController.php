<?php

namespace App\Http\Controllers\Judicial;

use App\Models\JudicialFile;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
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
            $path = public_path('storage');
            Storage::disk('public')->put($document->filename, $document->file);
            $word = \PhpOffice\PhpWord\IOFactory::load("{$path}\\{$document->filename}");

            $rtf = new \PhpOffice\PhpWord\Writer\HTML($word);
            $rtf->save("{$path}\\{$document->filename}.html");

            $file = File::get("{$path}\\{$document->filename}.html");
        }

        return back()->with('documentSelected', $this->extension[$document->ext] . ';base64,' . base64_encode($file));
    }
}
