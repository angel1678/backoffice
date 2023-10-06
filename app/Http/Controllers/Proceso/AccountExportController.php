<?php

namespace App\Http\Controllers\Proceso;

use App\Exports\JudiciaryAccountsExport;
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
        $url = url()->previous();
        $route = app('router')->getRoutes($url)->match(app('request')->create($url))->getName();

        $stage = $request->input('stage');
        $search = $request->input('search', '');
        $isDetained = $route == 'proceso-detenido.index';

        $fileName = $isDetained ? 'judicial_detenidos' : 'judicial';

        return Excel::download(
            new JudiciaryAccountsExport($stage, $search, $isDetained), "{$fileName}.xlsx"
        );
    }
}
