<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CoreHRUser;

class CoreHRUserSeeder extends Seeder
{
    public function run()
    {
        CoreHRUser::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => '123456', // this will be hashed automatically
        ]);
    }
}
