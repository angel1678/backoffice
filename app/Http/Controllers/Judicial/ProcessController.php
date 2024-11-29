<?php

namespace App\Http\Controllers\Judicial;

use App\Models\Type;
use App\Models\User;
use Inertia\Response;
use App\Models\Proceso;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Enums\ProcessStatus;
use Illuminate\Http\Request;
use App\Models\ProcedureType;
use App\Models\JudicialClient;
use App\Models\JudicialInvolved;
use BenSampo\Enum\Rules\EnumKey;
use App\Data\JudicialProcessData;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Data\JudicialProcessResource;
use App\Models\PersonWhoBilled;
use App\Models\RelevantInformation;
use Yaza\LaravelGoogleDriveStorage\Gdrive;

class ProcessController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $user = (object) Auth::user();
        $status = $request->input('status');
        $search = $request->input('search');

        $query = Proceso::query()->with(['client', 'user', 'actors', 'defendants']);
        $query->when($user->isNotAn('admin'), function ($query) use ($user) {
            $query->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereRelation('associates', 'user_id', $user->id);
            });
        })->when($status != null, function ($query) use ($status) {
            $query->where('status', $status);
        })->when(!empty($search), function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->whereRaw("CONCAT(judicatura_id, '-', anio_id, '-', numero_id) like '{$search}%'")
                    ->orWhere('accion_infraccion', 'like', "{$search}%");
            });
        })->when($user->isAn('admin'), function ($query) {
            $query->orderBy('user_id');
        });

        $procesos = $query->paginate(100);
        $procesos = JudicialProcessResource::collect($procesos);

        $movimients = session('movimients');

        $statusType = Type::group('JUDICIAL_STATE')
            ->get();

        return inertia('Judicial/Proceso/Index', [
            'procesos' => $procesos,
            'movimients' => $movimients,
            'search' => $search,
            'status' => $status,
            'statusType' => $statusType,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $users = User::dropdown()->get();
        $clients = JudicialClient::dropdown()->get();
        $actors = JudicialInvolved::type(50)->get();
        $defendants = JudicialInvolved::type(51)->get();

        $personWhoPays = PersonWhoBilled::where('is_visible', true)
            ->dropdown()
            ->get();
        $relevantInformation = RelevantInformation::where('is_visible', true)
            ->dropdown()
            ->get();
        $proceduresType = ProcedureType::whereNull('parent_id')
            ->dropdown()
            ->get();
        $proceduralStage = session('proceduralStage');

        $defendantsType = session('defendantsType');
        $clientSelected = session('clientSelected');

        $backRoute = url()->previous() === url()->current() ? session('backRoute') : url()->previous();
        session()->put('backRoute', $backRoute);

        return inertia('Judicial/Proceso/Create', [
            'actors' => $actors,
            'clients' => $clients,
            'clientSelected' => $clientSelected,
            'defaultUserId' => Arr::random(User::pluck('id')->toArray()),
            'defendants' => $defendants,
            'defendantsType' => $defendantsType,
            'personWhoPays' => $personWhoPays,
            'proceduresType' => $proceduresType,
            'proceduralStage' => $proceduralStage,
            'relevantInformation' => $relevantInformation,
            'users' => $users,
            'urlPrev' => $backRoute,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = JudicialProcessData::from($request);

        DB::beginTransaction();
        try {
            $personWhoPays = PersonWhoBilled::find($data->personWhoPays);
            if (empty($personWhoPays)) {
                $personWhoPays = PersonWhoBilled::create(['name' => $data->personWhoPays, 'is_visible' => false]);
                $data->personWhoPays = $personWhoPays->id;
            }

            $relevantInformation = RelevantInformation::find($data->relevantInformation);
            if (empty($relevantInformation)) {
                $relevantInformation = RelevantInformation::create(['name' => $data->relevantInformation, 'is_visible' => false]);
                $data->relevantInformation = $relevantInformation->id;
            }

            $judicialProcess = Proceso::create($data->toArray());
            $judicialProcess->associates()->attach($data->responsible);

            collect($data->actors)->each(function ($item) use ($judicialProcess) {
                $judicialProcess->involved()->create([
                    'type' => 50,
                    'name' => $item['name'],
                ]);
            });

            collect($data->defendants)->each(function ($item) use ($judicialProcess) {
                $judicialProcess->involved()->create([
                    'type' => 51,
                    'defendant_type' => $item['defendantType'],
                    'name' => $item['name'],
                ]);
            });

            collect($request->file('files'))
                ->each(function ($file) use ($judicialProcess, $data) {
                    $fileName = Str::random(24) . '.' . $file->getClientOriginalExtension();
                    Gdrive::put("{$data->process}/{$fileName}", $file);

                    $judicialProcess->files()->create([
                        'location' => $judicialProcess->process,
                        'name' => $fileName,
                        'origin_name' => $file->getClientOriginalName(),
                    ]);
                });

            DB::commit();
            return redirect()->route('judicial.process.index');
        } catch (\Throwable $th) {
            DB::rollback();
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Proceso $proceso)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proceso $proceso)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proceso $process)
    {
        $message = '';

        $data = (object) $request->validate([
            'status' => ['nullable', new EnumKey(ProcessStatus::class)],
            'procedureType' => ['nullable', 'numeric'],
            'proceduralStage' => ['nullable', 'numeric'],
        ]);

        DB::beginTransaction();
        try {
            if (!empty($data->status)) {
                $process->status = ProcessStatus::fromKey($data->status);
                $message = "El estado cambio a {$request->status}.";
            }

            if (!empty($data->procedureType)) {
                $process->type_of_procedure_id = $data->procedureType;
                $message = "El tipo de procedimiento fue actualizada.";
            }

            if (!empty($data->proceduralStage)) {
                $process->procedural_stage_id = $data->proceduralStage;
                $message = "La etapa procesal fue actualizada.";
            }

            if ($process->isDirty()) {
                $process->save();
            }

            DB::commit();
            return $this->backSuccess($message);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proceso $proceso)
    {
        //
    }
}
