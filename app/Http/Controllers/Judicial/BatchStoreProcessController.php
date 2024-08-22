<?php

namespace App\Http\Controllers\Judicial;

use Illuminate\Http\Request;
use App\Imports\ProcesoImport;
use App\Http\Controllers\Controller;

class BatchStoreProcessController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = (object) $request->validate([
            'clientId' => 'required|exists:judicial_clients,id',
            'userId' => 'required|exists:users,id',
        ]);

        $file = $request->file('fileProcesos');
        $import = new ProcesoImport($data->clientId, $data->userId);
        $import->import($file);

        if ($import->errors()->count() > 0) {
            return back()
                ->withErrors($import->errors()->toArray());
        }

        return redirect()->route('judicial.process.index');
    }
}
