<?php

namespace App\Http\Controllers\Judicial;

use Carbon\Carbon;
use App\Models\Template;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\CreateFileTrait;
use App\Http\Controllers\Controller;

class ExportTemplateController extends Controller
{
    use CreateFileTrait;
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Template $template)
    {
        $data = (object) $request->validate([
            'judicialMovimientIds' => 'required|array',
            'text' => 'nullable|string',
        ]);

        $fileName = Str::replace(' ', '_', $template->name) . '_' . Carbon::now()->format('Ymdhis');
        $this->generateTemplatePDF($data, $template, $fileName, '/templates');
        return back()->with('urlTemplate', url("storage/templates/{$fileName}.pdf"));
    }
}
