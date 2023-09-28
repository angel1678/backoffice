<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'admin',
            'nickname' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
        ]);

        $user->assign('admin');

        $user = User::create([
            'name' => 'Stalin',
            'nickname' => 'stalin',
            'email' => 'stalin.arechuac@gmail.com',
            'password' => Hash::make('password'),
        ]);

        $user->assign('lawyer');

        $users = User::factory(10)->create();

        foreach ($users as $user) {
            $user->assign('lawyer');
        }
    }
}
