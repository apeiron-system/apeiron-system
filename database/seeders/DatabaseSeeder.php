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
            ContractSeeder::class,
            ItemSeeder::class,
            ProjectSeeder::class,
            JobOrderSeeder::class,
            ProjectPartSeeder::class,
            ProjectPartItemSeeder::class,
        ]);
    }
}
