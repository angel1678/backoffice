<?php

namespace App\Http\Controllers\Coercive;

use App\Enums\GeographicalDistributionType;
use App\Http\Controllers\Controller;
use App\Models\CoerciveAccount;
use App\Models\CoerciveAccountContact;
use App\Models\GeographicalDistribution;
use App\Models\Type;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $types = Type::where('group', 'CONTACT')
            ->select('id as value', 'name as label')
            ->get();

        $locations = GeographicalDistribution::whereNotIn('type_id', [GeographicalDistributionType::COUNTRY])
            ->select('id as value', 'name as label', 'parent_id')
            ->get();

        return back()->with('options', [
            'types' => $types,
            'locations' => $locations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, CoerciveAccount $account)
    {
        $data = $request->validate([
            'typeId' => 'required',
            'location' => 'required_if:typeId,5,6',
            'value' => 'required',
            'observation' => 'required',
        ]);

        $value = ['value' => $data['value']];
        if (in_array($data['typeId'], [5, 6])) {
            $value['location_id'] = $data['location'];
            $value['location'] = GeographicalDistribution::find($data['location'])->name;
        }

        $account->contacts()->create([
            'type_id' => $data['typeId'],
            'data' => $value,
            'observation' => $data['observation'],
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, CoerciveAccount $account, CoerciveAccountContact $contact)
    {
        $data = $request->validate([
            'observation' => 'required',
        ]);

        $contact->observation = $data['observation'];
        $contact->is_active = false;

        $contact->save();
    }
}
