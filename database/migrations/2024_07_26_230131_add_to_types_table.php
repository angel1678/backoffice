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
        DB::table('types')->insert([
            ['id' => 30, 'group' => 'RELEVANT_INFORMATION', 'name' => 'Juicio coactivo anterior', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 31, 'group' => 'RELEVANT_INFORMATION', 'name' => 'N/A', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('types')->insert([
            ['id' => 40, 'group' => 'PERSON_WHO_PAYS', 'name' => 'Cliente', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 41, 'group' => 'PERSON_WHO_PAYS', 'name' => 'Actor', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 42, 'group' => 'PERSON_WHO_PAYS', 'name' => 'Demandado', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('types')->insert([
            ['id' => 50, 'group' => 'PERSON_INVOLVED', 'name' => 'Actor', 'is_visible' => false, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 51, 'group' => 'PERSON_INVOLVED', 'name' => 'Demandado', 'is_visible' => false, 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('types')->insert([
            ['id' => 60, 'group' => 'DEFENDANT_TYPE', 'name' => 'Deudor principal', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 61, 'group' => 'DEFENDANT_TYPE', 'name' => 'Garante', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('types')
            ->whereIn('group', ['RELEVANT_INFORMATION', 'PERSON_WHO_PAYS', 'PERSON_INVOLVED', 'DEFENDANT_TYPE'])
            ->delete();
    }
};
