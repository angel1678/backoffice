<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * CONTACTS TYPE
         */
        Type::create([
            'id' => 1,
            'group' => 'CONTACT',
            'name' => 'Telefono fijo',
        ]);

        Type::create([
            'id' => 2,
            'group' => 'CONTACT',
            'name' => 'Telefono celular',
        ]);

        Type::create([
            'id' => 3,
            'group' => 'CONTACT',
            'name' => 'Telefono trabajo',
        ]);

        Type::create([
            'id' => 4,
            'group' => 'CONTACT',
            'name' => 'Correo electronico',
        ]);

        Type::create([
            'id' => 5,
            'group' => 'CONTACT',
            'name' => 'Dirección domicilio',
        ]);

        Type::create([
            'id' => 6,
            'group' => 'CONTACT',
            'name' => 'Dirección trabajo',
        ]);

        /**
         * GEOGRAPHICAL DISTRIBUTION
         */
        Type::create([
            'id' => 20,
            'group' => 'GEOGRAPHICAL_DISTRIBUTION',
            'name' => 'País',
        ]);

        Type::create([
            'id' => 21,
            'group' => 'GEOGRAPHICAL_DISTRIBUTION',
            'name' => 'Provincia',
        ]);

        Type::create([
            'id' => 22,
            'group' => 'GEOGRAPHICAL_DISTRIBUTION',
            'name' => 'Canton',
        ]);

        Type::create([
            'id' => 23,
            'group' => 'GEOGRAPHICAL_DISTRIBUTION',
            'name' => 'Parroquia',
        ]);
    }
}
