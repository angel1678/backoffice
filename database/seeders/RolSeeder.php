<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Silber\Bouncer\BouncerFacade as Bouncer;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bouncer::role()->firstOrCreate([
            'name' => 'admin',
            'title' => 'Administrador',
        ]);

        Bouncer::role()->firstOrCreate([
            'name' => 'lawyer',
            'title' => 'Abogado',
        ]);
    }
}
