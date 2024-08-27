<?php

namespace App\Http\Controllers\Judicial;

use App\Http\Controllers\Controller;
use App\Models\ProcesoMovimiento;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreateBatchTemplateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $movimients = ProcesoMovimiento::has('proceso')
            ->whereHas('proceso', function ($query) {
                $query->where('user_id', Auth::id());
            })->get()
            ->map(fn($item) => ['value' => $item->id, 'label' => "{$item->proceso->process} - {$item->dependencia_jurisdiccional}"]);

        $templates = Template::dropdown()
            ->get();

        $urlTemplate = session('urlTemplate');

        return inertia('Judicial/Template/CreateBatch', [
            'movimients' => $movimients,
            'templates' => $templates,
            'urlTemplate' => $urlTemplate,
        ]);
    }
}
