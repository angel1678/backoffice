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
use App\Models\ProcedureType;
use App\Models\JudicialClient;
use App\Exports\ReportAccountExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $process = Proceso::when($request->clientId, function ($query) use ($request) {
            $query->where('client_id', $request->clientId);
        })
            ->when($request->procedureTypeId, function ($query) use ($request) {
                $query->where('type_of_procedure_id', $request->procedureTypeId);
            })
            ->when($request->proceduralStageId, function ($query) use ($request) {
                $query->where('procedural_stage_id', $request->proceduralStageId);
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

        $clientQuery = JudicialClient::with('judicials')
            ->when($request->clientId, function ($query) use ($request) {
                $query->where('id', $request->clientId);
            })
            ->when($request->procedureTypeId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'type_of_procedure_id', $request->procedureTypeId);
            })
            ->when($request->proceduralStageId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'procedural_stage_id', $request->proceduralStageId);
            })
            ->when($request->statusId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'status', $request->statusId);
            })
            ->when($request->userId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'user_id', $request->userId);
            })
            ->orderBy('id');

        $clientsId = $clientQuery->pluck('id');
        $clientsLabel = $clientQuery->pluck('name');
        $clientsValue = $clientQuery->withCount('judicials')->pluck('judicials_count');

        $reportByClient = [
            'ids' => $clientsId,
            'labels' => $clientsLabel,
            'values' => $clientsValue,
        ];

        $procedureTypeQuery = ProcedureType::with('judicialsProcedureType')
            ->when($request->clientId, function ($query) use ($request) {
                $query->where('id', $request->clientId);
            })
            ->when($request->procedureTypeId, function ($query) use ($request) {
                $query->whereRelation('judicialsProcedureType', 'type_of_procedure_id', $request->procedureTypeId);
            })
            // ->when($request->proceduralStageId, function ($query) use ($request) {
            //     $query->whereRelation('judicialsProcedureType', 'procedural_stage_id', $request->proceduralStageId);
            // })
            ->when($request->statusId, function ($query) use ($request) {
                $query->whereRelation('judicialsProcedureType', 'status', $request->statusId);
            })
            ->when($request->userId, function ($query) use ($request) {
                $query->whereRelation('judicialsProcedureType', 'user_id', $request->userId);
            })
            ->orderBy('id');

        $procedureTypeId = $procedureTypeQuery->pluck('id');
        $procedureTypeLabel = $procedureTypeQuery->pluck('name');
        $procedureTypeValue = $procedureTypeQuery->withCount('judicialsProcedureType')->pluck('judicials_procedure_type_count');

        $reportByProcedureType = [
            'ids' => $procedureTypeId,
            'labels' => $procedureTypeLabel,
            'values' => $procedureTypeValue,
        ];

        $procedureStageQuery = ProcedureType::with('judicialsProcedureStage')
            ->where('parent_id', $request->procedureTypeId)
            ->when($request->clientId, function ($query) use ($request) {
                $query->where('id', $request->clientId);
            })
            // ->when($request->procedureTypeId, function ($query) use ($request) {
            //     $query->whereRelation('judicialsProcedureStage', 'type_of_procedure_id', $request->procedureTypeId);
            // })
            ->when($request->proceduralStageId, function ($query) use ($request) {
                $query->whereRelation('judicialsProcedureStage', 'procedural_stage_id', $request->proceduralStageId);
            })
            ->when($request->statusId, function ($query) use ($request) {
                $query->whereRelation('judicialsProcedureStage', 'status', $request->statusId);
            })
            ->when($request->userId, function ($query) use ($request) {
                $query->whereRelation('judicialsProcedureStage', 'user_id', $request->userId);
            })
            ->orderBy('id');

        $procedureStageId = $procedureStageQuery->pluck('id');
        $procedureStageLabel = $procedureStageQuery->pluck('name');
        $procedureStageValue = $procedureStageQuery->withCount('judicialsProcedureStage')->pluck('judicials_procedure_stage_count');

        $reportByProcedureStage = [
            'ids' => $procedureStageId,
            'labels' => $procedureStageLabel,
            'values' => $procedureStageValue,
        ];

        $userQuery = User::with('judicials')
            ->when($request->clientId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'client_id', $request->clientId);
            })
            ->when($request->procedureTypeId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'type_of_procedure_id', $request->procedureTypeId);
            })
            ->when($request->proceduralStageId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'procedural_stage_id', $request->proceduralStageId);
            })
            ->when($request->statusId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'status', $request->statusId);
            })
            ->when($request->userId, function ($query) use ($request) {
                $query->whereRelation('judicials', 'user_id', $request->userId);
            })
            ->orderBy('id');

        $usersId = $userQuery->pluck('id');
        $usersLabel = $userQuery->pluck('name');
        $usersValue = $userQuery->withCount('judicials')->pluck('judicials_count');

        $reportByUser = [
            'ids' => $usersId,
            'labels' => $usersLabel,
            'values' => $usersValue,
        ];

        $proceduresType = ProcedureType::whereNull('parent_id')
            ->dropdown()
            ->get();

        $proceduralStatus = session('proceduralStage', []);

        $status = Type::group('JUDICIAL_STATE')->dropdown()->get();
        $users = User::dropdown()->get();
        $clients = JudicialClient::dropdown()->get();
        $urlFile = session('urlFile');

        return Inertia::render('Report/Index', [
            'clients' => $clients,
            'proceduresType' => $proceduresType,
            'proceduralStatus' => $proceduralStatus,
            'status' => $status,
            'users' => $users,
            'urlFile' => $urlFile,

            'report' => $report,
            'reportByClient' => $reportByClient,
            'reportByUser' => $reportByUser,
            'reportByProcedureType' => $reportByProcedureType,
            'reportByProcedureStage' => $reportByProcedureStage,
        ]);
    }

    public function export(Request $request): RedirectResponse
    {
        $fileName = 'report_' . Carbon::now()->format('YmdHis') . '.xlsx';

        Excel::store(new ReportAccountExport((object) $request->all()), "reports/{$fileName}", 'public');
        return back()->with('urlFile', url("storage/reports/{$fileName}"));
    }
}
