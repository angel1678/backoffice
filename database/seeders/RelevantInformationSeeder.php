<?php

namespace Database\Seeders;

use App\Models\RelevantInformation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RelevantInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RelevantInformation::create(['name' => 'Juicio coactivo anterior', 'is_visible' => true]);
        RelevantInformation::create(['name' => 'N/A', 'is_visible' => true]);
    }
}
