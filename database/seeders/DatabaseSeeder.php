<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            EmployeeSeeder::class,
            ItemSeeder::class,
            ContractSeeder::class,
            ProjectSeeder::class,
            JobOrderSeeder::class,
            JobOrderBoqSeeder::class,
            JobOrderBoqPartSeeder::class,
        ]);
    }
}
