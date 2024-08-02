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
        Schema::table('procesos', function (Blueprint $table) {
            $table->uuid('id')->change();
        });

        Schema::table('procesos_movimiento', function (Blueprint $table) {
            $table->uuid('proceso_id')->change();
        });

        Schema::table('procesos_user', function (Blueprint $table) {
            $table->uuid('proceso_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('procesos', function (Blueprint $table) {
            $table->bigIncrements('id')->change();
        });

        Schema::table('procesos_movimiento', function (Blueprint $table) {
            $table->integer('proceso_id')->change();
        });

        Schema::table('procesos_user', function (Blueprint $table) {
            $table->integer('proceso_id')->change();
        });
    }
};
