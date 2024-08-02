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
            $table->bigInteger('client_id');
            $table->string('person_who_pays');
            $table->string('identification', 15);
            $table->string('number_operation', 15);
            $table->decimal('amount', 8, 2, true);
            $table->string('relevant_information');
            $table->bigInteger('type_of_procedure_id');
            $table->bigInteger('procedural_stage_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('procesos', function (Blueprint $table) {
            $table->dropColumn([
                'client_id',
                'person_who_pays',
                'identification',
                'number_operation',
                'amount',
                'relevant_information',
                'type_of_procedure_id',
                'procedural_stage_id',
            ]);
        });
    }
};
