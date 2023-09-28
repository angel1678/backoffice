<?php

namespace App\Http\Controllers\Coercive;

use App\Exports\CoerciveAccountsExport;
use App\Http\Controllers\Controller;
use App\Models\CoerciveClient;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ClientAccountExportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, CoerciveClient $client)
    {
        $stage = $request->input('stage');
        $search = $request->input('search', '');

        return Excel::download(new CoerciveAccountsExport($client->id, $stage, $search), 'coactiva.xlsx');
    }
}
