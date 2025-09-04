<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::first(); // Royal HR Pvt Ltd

        User::create([
            'name' => 'Admin HR',
            'email' => 'admin@royalhr.com',
            'password' => Hash::make('password123'),
            'company_id' => $company->id,
        ]);
    }
}
