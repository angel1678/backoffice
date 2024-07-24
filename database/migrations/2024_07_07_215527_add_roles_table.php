<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('roles')
            ->insert([
                'id' => 3,
                'name' => 'accountant',
                'title' => 'Contable',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

        DB::table('roles')
            ->insert([
                'id' => 4,
                'name' => 'judicialHead',
                'title' => 'Jefe judicial',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

        DB::table('roles')
            ->where('id', '=', 2)
            ->update(['title' => 'Asistente judicial']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
