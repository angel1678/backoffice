<?php

namespace Database\Seeders;

use App\Models\PersonWhoBilled;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonWhoBilledSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PersonWhoBilled::create(['name' => 'Cliente', 'is_visible' => true]);
        PersonWhoBilled::create(['name' => 'Actor', 'is_visible' => true]);
        PersonWhoBilled::create(['name' => 'Demandado', 'is_visible' => true]);
    }
}
