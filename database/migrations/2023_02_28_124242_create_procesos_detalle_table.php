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
        Schema::create('procesos_detalle', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('movimiento_id');
            $table->timestamp('fecha');
            $table->string('titulo', 500);
            $table->text('comentario');
            $table->timestamp('sended_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procesos_detalle');
    }
};
