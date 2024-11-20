<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ContractSeeder::class, // Make sure this runs first
            ProjectSeeder::class,
            JobOrderSeeder::class,
            BoqSeeder::class,
            BoqPartSeeder::class,
        ]);
    }
}