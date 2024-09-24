<?php

namespace App\Http\Controllers\Judicial;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ProcesoDetalle;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

class StoreUploadFileController extends Controller
{
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
                    $fileName = Str::random(24) . '.' . $file->getClientOriginalExtension();
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
            return $this->backWarning('Ocurrio un error al momento de subir un documento.');
        }
    }
}
