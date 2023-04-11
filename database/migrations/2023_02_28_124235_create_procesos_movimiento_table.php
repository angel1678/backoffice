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
        Schema::create('procesos_movimiento', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('proceso_id');
            $table->timestamp('fecha');
            $table->smallInteger('numero_ingreso');
            $table->string('dependencia_jurisdiccional', 1000);
            $table->text('actor_ofendido');
            $table->string('accion_infraccion', 1000);
            $table->text('demandado_procesado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procesos_movimiento');
    }
};
