<?php

namespace App\Http\Controllers\Proceso;

use App\Http\Controllers\Controller;
use App\Models\Proceso;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Proceso $proceso, Request $request)
    {
        $search = $request->input('search');
        $associates = $proceso->associates();
        if ($search) {
            $associates = $associates->where('name', 'like', "%{$search}%");
        }

        return response()->json([
            'associates' => $associates->select('id', 'name')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Proceso $proceso)
    {
        $data = $request->validate([
            'userId' => 'required|numeric'
        ]);

        $proceso->associates()->attach($data['userId']);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proceso $proceso, User $user)
    {
        $proceso->associates()->detach($user->id);

        return back();
    }
}
