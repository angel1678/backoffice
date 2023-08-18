<?php

namespace Database\Seeders;

use App\Models\CoerciveAccountStage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoerciveAccountStageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CoerciveAccountStage::create([
            'name' => 'Título de Crédito',
        ]);

        CoerciveAccountStage::create([
            'name' => 'Requerimiento Pago Voluntario',
            'with_notification' => true,
        ]);

        CoerciveAccountStage::create([
            'name' => 'Orden de Pago Inmediato',
            'with_notification' => true,
        ]);

        CoerciveAccountStage::create([
            'name' => 'Medidas Cautelares',
        ]);

        CoerciveAccountStage::create([
            'name' => 'Acuerdo Transaccional',
        ]);

        CoerciveAccountStage::create([
            'name' => 'Facilidades de Pago',
        ]);

        CoerciveAccountStage::create([
            'name' => 'Embargo',
        ]);

        CoerciveAccountStage::create([
            'name' => 'Avalúo',
        ]);

        CoerciveAccountStage::create([
            'name' => 'Remate',
        ]);

        CoerciveAccountStage::create([
            'name' => 'Archivo',
        ]);
    }
}
