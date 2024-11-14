<?php

namespace App\Http\Controllers\Judicial;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ProcesoDetalle;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\JudicialFile;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

use function Amp\ByteStream\split;

class StoreUploadFileController extends Controller
{

    private function getCountFile(mixed $procesoId, string $name)
    {
        return JudicialFile::join('procesos_detalle', function ($join) {
            $join->on('judicial_files.judicial_id', '=', 'procesos_detalle.id')
                ->where('judicial_files.judicial_type', '=', 'App\Models\ProcesoDetalle');
        })
            ->join('procesos_movimiento', 'procesos_movimiento.id', '=', 'procesos_detalle.movimiento_id')
            ->join('procesos', 'procesos.id', '=', 'procesos_movimiento.proceso_id')
            ->where('procesos.id', '=', $procesoId)
            ->where('judicial_files.name', 'like', "{$name}%")
            ->count();
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ProcesoDetalle $judicialDetail)
    {
        DB::beginTransaction();
        try {
            $judicial = $judicialDetail->movimiento->proceso;

            collect($request->file('files'))
                ->each(function ($file) use ($judicialDetail, $judicial) {
                    $fileName = substr($file->getClientOriginalName(), 0, strripos($file->getClientOriginalName(), '.'));
                    $filesCount = $this->getCountFile($judicial->id, $fileName) + 1;
                    $fileName = $fileName . '_' . str_pad($filesCount, 2, '0', STR_PAD_LEFT) . '.' . $file->getClientOriginalExtension();
                    Gdrive::put("{$judicial->process}/{$fileName}", $file);

                    $judicialDetail->files()->create([
                        'location' => $judicial->process,
                        'name' => $fileName,
                        'origin_name' => $file->getClientOriginalName(),
                    ]);
                });
            DB::commit();
            return $this->backSuccess('El documento fue subido correctamente.');
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            return $this->backWarning('Ocurrio un error al momento de subir un documento.');
        }
    }
}
