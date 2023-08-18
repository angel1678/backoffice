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
        Schema::create('coercive_account_contacts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('coercive_account_id');
            $table->smallInteger('type_id');
            $table->json('data');
            $table->string('observation', 300)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coercive_account_contacts');
    }
};
