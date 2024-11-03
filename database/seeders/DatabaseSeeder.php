<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            EmployeeSeeder::class,
            ProjectContractSeeder::class,
            JobOrderSeeder::class,        // Make sure this runs first
            JobOrderPartSeeder::class,    // Then this
            PayItemSeeder::class,
            PayItemJobOrderSeeder::class,
            ContractSeeder::class, // Make sure this runs first
            ProjectSeeder::class, // Then this
        ]);
    }
}