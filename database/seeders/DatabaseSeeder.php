<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            EmployeeSeeder::class,   // Then this
            ContractSeeder::class, // Make sure this runs first
            ProjectSeeder::class, // Then this
        ]);
    }
}