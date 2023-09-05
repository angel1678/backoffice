<?php

namespace Database\Seeders;

use App\Models\CoerciveAccountStage;
use Illuminate\Database\Seeder;

class CoerciveAccountStageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CoerciveAccountStage::create([
            'id' => 1,
            'name' => 'Título de Crédito',
        ]);

        CoerciveAccountStage::create([
            'id' => 2,
            'name' => 'Requerimiento Pago Voluntario',
            'with_notification' => true,
        ]);

        CoerciveAccountStage::create([
            'id' => 3,
            'name' => 'Orden de Pago Inmediato',
            'with_notification' => true,
        ]);

        CoerciveAccountStage::create([
            'id' => 4,
            'name' => 'Medidas Cautelares',
        ]);

        CoerciveAccountStage::create([
            'id' => 5,
            'name' => 'Acuerdo Transaccional',
        ]);

        CoerciveAccountStage::create([
            'id' => 6,
            'name' => 'Facilidades de Pago',
        ]);

        CoerciveAccountStage::create([
            'id' => 7,
            'name' => 'Embargo',
        ]);

        CoerciveAccountStage::create([
            'id' => 8,
            'name' => 'Avalúo',
        ]);

        CoerciveAccountStage::create([
            'id' => 9,
            'name' => 'Remate',
        ]);

        CoerciveAccountStage::create([
            'id' => 10,
            'name' => 'Archivo',
        ]);
    }
}
