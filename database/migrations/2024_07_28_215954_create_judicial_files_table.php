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
        Schema::create('judicial_files', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuidMorphs('judicial');
            // $table->bigInteger('judicial_id');
            // $table->string('judicial_detail_id')->nullable();
            $table->string('location');
            $table->string('name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('judicial_files');
    }
};
