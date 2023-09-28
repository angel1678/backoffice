<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class AdminCreate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create {name} {email} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crear usuario administrador.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $nickname = User::whereNickName($this->argument('name'));

        $user = User::create([
            'name' => $this->argument('name'),
            'nickname' => $nickname,
            'email' => $this->argument('email'),
            'password' => Hash::make($this->argument('password')),
        ]);

        $user->assign('admin');
    }
}
