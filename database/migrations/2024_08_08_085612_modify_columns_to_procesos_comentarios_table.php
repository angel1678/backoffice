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
        Schema::table('procesos_comentarios', function (Blueprint $table) {
            $table->uuidMorphs('judicial');
            $table->dropColumn('detalle_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('procesos_comentarios', function (Blueprint $table) {
            $table->uuid('detalle_id');
            $table->dropMorphs('judicial');
        });
    }
};
