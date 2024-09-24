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
        Schema::dropIfExists('judicial_process_involved');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('judicial_process_involved', function (Blueprint $table) {
            $table->uuid('judicial_id');
            $table->bigInteger('involved_id');
            $table->integer('defendant_type')->nullable();
            $table->timestamps();

            $table->primary(['judicial_id', 'involved_id']);
        });
    }
};
