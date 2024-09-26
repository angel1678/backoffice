<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('procesos_movimiento', function (Blueprint $table) {
            $table->smallInteger('numero_ingreso')->nullable()->change();
            $table->string('dependencia_jurisdiccional', 1000)->nullable()->change();
            $table->text('actor_ofendido')->nullable()->change();
            $table->text('demandado_procesado')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('procesos_movimiento', function (Blueprint $table) {
            $table->smallInteger('numero_ingreso')->change();
            $table->string('dependencia_jurisdiccional', 1000)->change();
            $table->text('actor_ofendido')->change();
            $table->text('demandado_procesado')->change();
        });
    }
};
