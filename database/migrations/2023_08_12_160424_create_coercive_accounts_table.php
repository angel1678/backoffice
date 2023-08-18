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
        Schema::create('coercive_accounts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('client_id');
            $table->string('process', 100);
            $table->string('identification', 15);
            $table->string('name', 200);
            $table->bigInteger('stage_id')->nullable();
            $table->string('stage', 200);
            $table->double('principal_amount', 12, 2);
            $table->string('observation', 1000)->nullable();
            $table->string('aforementioned', 20)->nullable(); //Citado
            $table->string('dispatch', 20)->nullable(); //Despachado
            $table->bigInteger('executive_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coercive_accounts');
    }
};
