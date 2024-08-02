<?php

namespace App\Http\Controllers\Configuration;

use App\Data\CompanyData;
use Inertia\Response;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyConfigurationContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $models = Company::get();

        return inertia('Configuration/Company/Index', [
            'models' => $models,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyData $data)
    {
        Company::create($data->toArray());

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();
        back();
    }
}
