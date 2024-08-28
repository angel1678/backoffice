<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Type;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Proceso;
use App\Enums\ProcessStatus;
use Illuminate\Http\Request;
use App\Models\JudicialClient;
use App\Exports\ReportAccountExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $clients = JudicialClient::dropdown()->get();
        $proceduresType = Type::group('PROCEDURE_TYPE')->dropdown()->get();
        $status = Type::group('JUDICIAL_STATE')->dropdown()->get();
        $users = User::dropdown()->get();

        $process = Proceso::when($request->clientId, function ($query) use ($request) {
            $query->where('client_id', $request->clientId);
        })
            ->when($request->procedureTypeId, function ($query) use ($request) {
                $query->where('type_of_procedure_id', $request->procedureTypeId);
            })
            ->when($request->statusId, function ($query) use ($request) {
                $query->where('status', $request->statusId);
            })
            ->when($request->userId, function ($query) use ($request) {
                $query->where('user_id', $request->userId);
            })
            ->get();

        $report = [
            'active' => $process->where('status', ProcessStatus::activo)->count(),
            'pasivo' => $process->where('status', ProcessStatus::pasivo)->count(),
            'congelado' => $process->where('status', ProcessStatus::congelado)->count(),
            'nocongelado' => $process->where('status', '!=', ProcessStatus::congelado)->count(),
        ];

        $urlFile = session('urlFile');

        return Inertia::render('Report/Index', [
            'clients' => $clients,
            'proceduresType' => $proceduresType,
            'status' => $status,
            'users' => $users,
            'report' => $report,
            'urlFile' => $urlFile,
        ]);
    }

    public function export(Request $request): RedirectResponse
    {
        $fileName = 'report_' . Carbon::now()->format('YmdHis') . '.xlsx';

        Excel::store(new ReportAccountExport((object) $request->all()), "reports/{$fileName}", 'public');
        return back()->with('urlFile', url("storage/reports/{$fileName}"));
    }
}
