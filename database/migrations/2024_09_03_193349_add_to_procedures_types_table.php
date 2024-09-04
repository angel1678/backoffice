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
        DB::table('procedures_types')->insert([
            ['id' => 1, 'name' => 'Ejecutivo', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Ordinario', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Ejecución', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Concurso de Acreedores (Insolvencia)', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'Voluntario', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'name' => 'Sumario', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'name' => 'Monitorio', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'name' => 'Constitucional', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /** Ejecutivo */
        DB::table('procedures_types')->insert([
            ['id' => 9, 'parent_id' => 1, 'name' => 'Presentación de la Demanda', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'parent_id' => 1, 'name' => 'Calificación', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 11, 'parent_id' => 1, 'name' => 'Prov. Preventiva', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 12, 'parent_id' => 1, 'name' => 'Citaciones', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /** Ordinario */
        DB::table('procedures_types')->insert([
            ['id' => 13, 'parent_id' => 2, 'name' => 'Presentación de la Demanda', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 14, 'parent_id' => 2, 'name' => 'Calificación', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 15, 'parent_id' => 2, 'name' => 'Citaciones', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /** Ejecución */
        DB::table('procedures_types')->insert([
            ['id' => 16, 'parent_id' => 3, 'name' => 'Presentación de la Demanda', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 17, 'parent_id' => 3, 'name' => 'Calificación', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 18, 'parent_id' => 3, 'name' => 'Citaciones', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /** Concurso de Acreedores (Insolvencia) */
        DB::table('procedures_types')->insert([
            ['id' => 19, 'parent_id' => 4, 'name' => 'Presentación de la Demanda', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 20, 'parent_id' => 4, 'name' => 'Citaciones', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 21, 'parent_id' => 4, 'name' => 'Calificación/Auto Inicial', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 22, 'parent_id' => 4, 'name' => 'Citación Realizada', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 23, 'parent_id' => 4, 'name' => 'Razón de Oposición', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 24, 'parent_id' => 4, 'name' => 'Declaratoria de Intedicción', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 25, 'parent_id' => 4, 'name' => 'Oficios Y Copias Cert. Retiradas Y Entregadas', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /** Voluntario */
        DB::table('procedures_types')->insert([
            ['id' => 26, 'parent_id' => 5, 'name' => 'Calificación', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 27, 'parent_id' => 5, 'name' => 'Citaciones', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 28, 'parent_id' => 5, 'name' => 'Presentación de la solitud', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 29, 'parent_id' => 5, 'name' => 'Oposición', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /** Sumario */
        DB::table('procedures_types')->insert([
            ['id' => 30, 'parent_id' => 6, 'name' => 'Presentación de la Demanda', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 31, 'parent_id' => 6, 'name' => 'Calificación', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 32, 'parent_id' => 6, 'name' => 'Citaciones', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /** Monitorio */
        DB::table('procedures_types')->insert([
            ['id' => 33, 'parent_id' => 7, 'name' => 'Presentación de la Demanda', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 34, 'parent_id' => 7, 'name' => 'Citaciones', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 35, 'parent_id' => 7, 'name' => 'Calificación y auto de pago', 'created_at' => now(), 'updated_at' => now()],
        ]);

        /** Constitucional */
        DB::table('procedures_types')->insert([
            ['id' => 36, 'parent_id' => 8, 'name' => 'Presentación de la acción', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 37, 'parent_id' => 8, 'name' => 'Convocatoria a audiencia', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 38, 'parent_id' => 8, 'name' => 'Sentencia', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 39, 'parent_id' => 8, 'name' => 'Ejecución', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('procedures_types', function (Blueprint $table) {
            //
        });
    }
};
