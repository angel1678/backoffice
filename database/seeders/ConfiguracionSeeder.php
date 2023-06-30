<?php

namespace Database\Seeders;

use App\Models\Configuracion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfiguracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Configuracion::create([
            'grupo' => 'proceso',
            'parametro' => 'ultimas_actualizaciones',
            'nombre' => 'Ultimas Actualizaciones',
            'descripcion' => 'Cantidad de items que se van a mostrar en ultimas actuaizaciones.',
            'valor' => '5'
        ]);

        Configuracion::create([
            'grupo' => 'proceso',
            'parametro' => 'casos_detenidos',
            'nombre' => 'Casos detenidos',
            'descripcion' => 'Tiempo que debe transcurrir (días) para que un proceso se considere como detenido.',
            'valor' => '60'
        ]);
    }
}
