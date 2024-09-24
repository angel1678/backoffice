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
        Schema::dropIfExists('judicial_involved');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('judicial_involved', function (Blueprint $table) {
            $table->id();
            $table->integer('type');
            $table->string('name');
            $table->timestamps();
        });
    }
};
