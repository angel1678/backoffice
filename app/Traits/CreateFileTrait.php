<?php

namespace App\Traits;

use App\Models\Template;
use Illuminate\Support\Str;
use App\Models\Configuracion;
use App\Models\TemplateParam;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\ProcesoMovimiento;
use App\Data\JudicialProcessTemplateData;
use Illuminate\Support\Facades\View;

trait CreateFileTrait
{
    protected function generateTemplatePDF(object $data, Template $template, string $fileName, string $path, string $disk = 'public')
    {
        $judicialMovimientIds = collect($data->judicialMovimientIds ?? []);
        $references = Configuracion::getGroup('template')->get();
        $configurations = (object) $references
            ->map(fn($item) => [$item->parametro => $item->valor])
            ->flatMap(fn($values) => $values)
            ->toArray();

        if ($data->text && ($judicialMovimientIds->count() == 1 || !empty($data->judicialMovimientId))) {
            $pdf = Pdf::loadView('pdfs.templates.general', [
                'logo' => public_path() . '/img/logo-black.png',
                'text' => $data->text,
                'firma' => '',
                'references' => $configurations,
            ]);
            $pdf->setPaper('A4', 'portrait');
            $pdf->save("{$path}/{$fileName}.pdf", $disk);
        } else if ($judicialMovimientIds->count() > 1) {
            $pages = [];
            $judicialMovimientIds->each(function ($movimient) use ($template, $configurations, &$pages) {
                $movimient = ProcesoMovimiento::find($movimient);
                $form = $this->generateTemplate($template, $movimient);
                $pages[] = View::make('pdfs.templates.general', [
                    'logo' => public_path() . '/img/logo-black.png',
                    'text' => $form,
                    'firma' => '',
                    'references' => $configurations,
                ])->render();
            });

            $pdf = Pdf::loadView('pdfs.templates.multiple', [
                'pages' => $pages
            ]);
            $pdf->setPaper('A4', 'portrait');
            $pdf->save("{$path}/{$fileName}.pdf", $disk);
        }
    }

    protected function generateTemplate(Template $template, ProcesoMovimiento $procesoMovimiento): string
    {
        $params = [];
        $form = $template->template;
        preg_match_all("/{{\w+}}/i", $form, $params);
        $process = JudicialProcessTemplateData::from($procesoMovimiento);

        collect($params)
            ->flatten()
            ->each(function ($param) use (&$form, $process) {
                $paramTemplate = TemplateParam::where('key', Str::replaceMatches("/[{|}]/i", '', $param))->first();
                if (!empty($paramTemplate) && !empty($process->{$paramTemplate->column})) {
                    $form = Str::replaceFirst($param, $process->{$paramTemplate->column}, $form);
                }
            });

        return $form;
    }
}
