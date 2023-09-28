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
        Schema::create('coercive_clients', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('description', 300)->nullable();
            $table->string('image', 500);
            $table->boolean('is_active')->default(true);
            $table->bigInteger('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coercive_clients');
    }
};
