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
        DB::table('types')->insert([
            ['id' => 70, 'group' => 'JUDICIAL_STATE', 'name' => 'Activo', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 71, 'group' => 'JUDICIAL_STATE', 'name' => 'Pasivo', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 72, 'group' => 'JUDICIAL_STATE', 'name' => 'Congelado o Sin movimiento', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('types')->insert([
            ['id' => 100, 'group' => 'PROCEDURE_TYPE', 'name' => 'Ejecutivo', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 101, 'group' => 'PROCEDURE_TYPE', 'name' => 'Ordinario', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 102, 'group' => 'PROCEDURE_TYPE', 'name' => 'Ejecución', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 103, 'group' => 'PROCEDURE_TYPE', 'name' => 'Concurso de Acreedores (Insolvencia)', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 104, 'group' => 'PROCEDURE_TYPE', 'name' => 'Voluntario', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 105, 'group' => 'PROCEDURE_TYPE', 'name' => 'Sumario', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 106, 'group' => 'PROCEDURE_TYPE', 'name' => 'Monitorio', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 107, 'group' => 'PROCEDURE_TYPE', 'name' => 'Constitucional', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('types')->insert([
            ['id' => 200, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Presentación de la Demanda', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 201, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Calificación', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 202, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Prov. Preventiva', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 203, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Citaciones', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 204, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Liquidación', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 205, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Mandamiento De Ejecución', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 206, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Calificación y auto de pago', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 207, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Presentación de la acción', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 208, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Convocatoria a audiencia', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 209, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Sentencia', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 210, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Ejecución', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 211, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Calificación/Auto Inicial', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 212, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Citación Realizada', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 213, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Razón de Oposición', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 214, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Declaratoria de Intedicción', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 215, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Oficios Y Copias Cert. Retiradas Y Entregadas', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 216, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Presentación de la solitud', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 217, 'group' => 'PROCEDURAL_STAGE', 'name' => 'Oposición', 'is_visible' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('types_relationships')->insert([
            //Ejecutivo
            ['type_id' => 200, 'parent_type_id' => 100, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 201, 'parent_type_id' => 100, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 202, 'parent_type_id' => 100, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 203, 'parent_type_id' => 100, 'created_at' => now(), 'updated_at' => now()],
            //Ordinario
            ['type_id' => 200, 'parent_type_id' => 101, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 201, 'parent_type_id' => 101, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 203, 'parent_type_id' => 101, 'created_at' => now(), 'updated_at' => now()],
            //Ejecución
            ['type_id' => 200, 'parent_type_id' => 102, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 201, 'parent_type_id' => 102, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 203, 'parent_type_id' => 102, 'created_at' => now(), 'updated_at' => now()],
            //Concurso de Acreedores (Insolvencia)
            ['type_id' => 200, 'parent_type_id' => 103, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 211, 'parent_type_id' => 103, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 203, 'parent_type_id' => 103, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 212, 'parent_type_id' => 103, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 213, 'parent_type_id' => 103, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 214, 'parent_type_id' => 103, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 215, 'parent_type_id' => 103, 'created_at' => now(), 'updated_at' => now()],
            //Voluntario
            ['type_id' => 216, 'parent_type_id' => 104, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 201, 'parent_type_id' => 104, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 203, 'parent_type_id' => 104, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 217, 'parent_type_id' => 104, 'created_at' => now(), 'updated_at' => now()],
            //Sumario
            ['type_id' => 200, 'parent_type_id' => 105, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 201, 'parent_type_id' => 105, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 203, 'parent_type_id' => 105, 'created_at' => now(), 'updated_at' => now()],
            //Monitorio
            ['type_id' => 200, 'parent_type_id' => 106, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 206, 'parent_type_id' => 106, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 203, 'parent_type_id' => 106, 'created_at' => now(), 'updated_at' => now()],
            //Constitucional
            ['type_id' => 207, 'parent_type_id' => 107, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 208, 'parent_type_id' => 107, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 209, 'parent_type_id' => 107, 'created_at' => now(), 'updated_at' => now()],
            ['type_id' => 210, 'parent_type_id' => 107, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('types_relationships')
            ->whereIn('parent_type_id', [100, 101, 102, 103, 104, 105, 106, 107])
            ->delete();

        DB::table('types')
            ->whereIn('group', ['JUDICIAL_STATE', 'PROCEDURE_TYPE', 'PROCEDURAL_STAGE'])
            ->delete();
    }
};
