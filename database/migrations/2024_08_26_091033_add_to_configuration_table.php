<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('configuraciones')->insert([
            [
                'grupo' => 'template',
                'parametro' => 'phone',
                'valor' => '9999999999',
                'nombre' => 'Telefono de referencia',
                'descripcion' => 'Número de telefono que se muestra como referencia en los documentos.',
            ],
            [
                'grupo' => 'template',
                'parametro' => 'email',
                'valor' => 'notificaciones@loyalis.ec',
                'nombre' => 'Correo electronico de referencia',
                'descripcion' => 'Correo electronico que se muestra como referencia en los documentos.',
            ],
            [
                'grupo' => 'template',
                'parametro' => 'web_page',
                'valor' => 'www.loyalis.ec',
                'nombre' => 'Pagina web de referencia',
                'descripcion' => 'Pagina web que se muestra como referencia en los documentos.',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('configuration', function (Blueprint $table) {
            //
        });
    }
};
