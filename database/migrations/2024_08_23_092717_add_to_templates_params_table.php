<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('templates_params')->insert([
            ['name' => 'Tipo código', 'key' => 'tipo_codigo', 'column' => ''],
            ['name' => 'No. proceso', 'key' => 'numero_proceso', 'column' => 'process'],
            ['name' => 'Titulo', 'key' => 'titulo', 'column' => ''],
            ['name' => 'Identificación', 'key' => 'identificacion', 'column' => 'identification'],
            ['name' => 'Tipo identificación', 'key' => 'tipo_identificacion', 'column' => 'identificationType'],
            ['name' => 'Direccion', 'key' => 'direccion', 'column' => 'address'],
            ['name' => 'Cliente', 'key' => 'cliente', 'column' => 'client'],
            ['name' => 'Dependencia Jurisdicional', 'key' => 'dependencia_jurisdicional', 'column' => 'dependencieJudicial'],
            ['name' => 'Demandados', 'key' => 'demandados', 'column' => 'defendants'],
            ['name' => 'Ejecutivo', 'key' => 'ejecutivo', 'column' => 'ejecutive'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('templates_params')->delete();
    }
};
