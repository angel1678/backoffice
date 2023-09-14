<?php

namespace App\Http\Controllers\Coercive;

use App\Exports\CoerciveAccountsExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class AccountExportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $client = $request->input('client');
        $stage = $request->input('stage');
        $search = $request->input('search', '');

        return Excel::download(new CoerciveAccountsExport($client, $stage, $search), 'coactiva.xlsx');
    }
}
