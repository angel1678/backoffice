<?php

namespace App\Http\Controllers\Coercive;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\CoerciveClient;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $query = CoerciveClient::query();
        $clients = $query->get();

        return Inertia::render('Coercive/Client/Index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Coercive/Client/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = (object) $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:300',
            'image' => 'file',
        ]);

        $file = $request->file('image');
        $fileName = Str::uuid();
        $extension = $file->getClientOriginalExtension();
        $fileName = $fileName.'.'.$extension;
        $file->storeAs("coercive/client/{$fileName}");

        CoerciveClient::create([
            'name' => $data->name,
            'description' => $data->description,
            'image' => $fileName,
            'user_id' => Auth::id(),
        ]);

        return back();
    }
}
