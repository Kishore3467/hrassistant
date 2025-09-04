<?php

namespace Database\Seeders;   // <-- namespace add pannunga

use Illuminate\Database\Seeder;
use App\Models\Company;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        Company::create([
            'name' => 'Royal HR Pvt Ltd',
            'email' => 'info@royalhr.com',
        ]);

        Company::create([
            'name' => 'Global Tech Solutions',
            'email' => 'contact@globaltech.com',
        ]);
    }
}
