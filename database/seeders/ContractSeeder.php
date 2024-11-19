<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContractSeeder extends Seeder
{
    public function run()
    {
        // Specific data for active contracts
        $activeContracts = [
            [
                'contract_name' => 'Active Contract 1',
                'progress' => 20, // 20% progress
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Active Contract 2',
                'progress' => 40, // 40% progress
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Active Contract 3',
                'progress' => 60, // 60% progress
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Active Contract 4',
                'progress' => 80, // 80% progress
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Active Contract 5',
                'progress' => 100, // 100% progress
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Specific data for past contracts
        $pastContracts = [
            [
                'contract_name' => 'Past Contract 1',
                'progress' => 100, // Completed
                'status' => 'past',
                'created_at' => now()->subMonths(12), // Created 12 months ago
                'updated_at' => now()->subMonths(6),  // Updated 6 months ago
            ],
            [
                'contract_name' => 'Past Contract 2',
                'progress' => 100, // Completed
                'status' => 'past',
                'created_at' => now()->subMonths(10),
                'updated_at' => now()->subMonths(5),
            ],
            [
                'contract_name' => 'Past Contract 3',
                'progress' => 100, // Completed
                'status' => 'past',
                'created_at' => now()->subMonths(8),
                'updated_at' => now()->subMonths(4),
            ],
            [
                'contract_name' => 'Past Contract 4',
                'progress' => 100, // Completed
                'status' => 'past',
                'created_at' => now()->subMonths(6),
                'updated_at' => now()->subMonths(3),
            ],
            [
                'contract_name' => 'Past Contract 5',
                'progress' => 100, // Completed
                'status' => 'past',
                'created_at' => now()->subMonths(4),
                'updated_at' => now()->subMonths(2),
            ],
        ];

        // Insert data into the database
        DB::table('contracts')->insert(array_merge($activeContracts, $pastContracts));
    }
}
