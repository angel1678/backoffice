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
        Schema::create('types_relationships', function (Blueprint $table) {
            $table->bigInteger('type_id');
            $table->bigInteger('parent_type_id');
            $table->timestamps();

            $table->primary(['type_id', 'parent_type_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('types_relationships');
    }
};
