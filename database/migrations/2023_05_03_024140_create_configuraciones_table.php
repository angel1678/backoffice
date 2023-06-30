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
        Schema::create('configuraciones', function (Blueprint $table) {
            $table->id();
            $table->string('grupo', 60);
            $table->string('parametro', 60);
            $table->text('valor')->nullable();
            $table->string('tipo', 20)->default('text');
            $table->string('nombre', 300);
            $table->string('descripcion', 300)->nullable();
            $table->timestamps();

            $table->unique(['grupo', 'parametro']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configuraciones');
    }
};
