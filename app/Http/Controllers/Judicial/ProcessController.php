<?php

namespace App\Http\Controllers\Judicial;

use App\Models\Type;
use App\Models\User;
use Inertia\Response;
use App\Models\Proceso;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Models\JudicialFile;
use Illuminate\Http\Request;
use App\Models\JudicialClient;
use App\Models\JudicialInvolved;
use App\Data\JudicialProcessData;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Data\JudicialProcessResource;
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
            $query->where('activo', $status);
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

        return inertia('Judicial/Proceso/Index', [
            'procesos' => $procesos,
            'movimients' => $movimients,
            'search' => $search,
            'status' => $status,
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

        $personWhoPays = Type::group('PERSON_WHO_PAYS')->get();
        $relevantInformation = Type::group('RELEVANT_INFORMATION')->get();

        $defendantsType = session('defendantsType');
        $clientSelected = session('clientSelected');

        return inertia('Judicial/Proceso/Create', [
            'actors' => $actors,
            'clients' => $clients,
            'clientSelected' => $clientSelected,
            'defaultUserId' => Arr::random(User::pluck('id')->toArray()),
            'defendants' => $defendants,
            'defendantsType' => $defendantsType,
            'personWhoPays' => $personWhoPays,
            'relevantInformation' => $relevantInformation,
            'users' => $users,
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
            $judicialProcess = Proceso::create($data->toArray());
            $judicialProcess->associates()->attach($data->responsible);
            $judicialProcess->actors()->sync($data->actors);
            $judicialProcess->defendants()->sync($data->defendants);

            collect($request->file('files'))
                ->each(function ($file) use ($judicialProcess, $data) {
                    $fileName = Str::random(24) . '.' . $file->getClientOriginalExtension();
                    Gdrive::put("{$data->process}/{$fileName}", $file);

                    $judicialProcess->files()->create([
                        'location' => $judicialProcess->process,
                        'name' => $fileName,
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
    public function update(Request $request, Proceso $proceso)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proceso $proceso)
    {
        //
    }
}
