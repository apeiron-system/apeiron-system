<?php

namespace Database\Seeders;

use App\Models\Contract;
use Illuminate\Database\Seeder;

class ContractSeeder extends Seeder
{
    public function run()
    {
         // Hardcoded data for active contracts
        $activeContracts = [
            [
                'contract_id' => 'ACT001',
                'contract_name' => 'Active Contract 1',
                'location' => 'Toril',
                'duration' => '12 months',
                'budget' => 1000000,
                'start_date' => '2024-01-01',
                'end_date' => '2024-12-31',
                'status' => 'active',
            ],
            [
                'contract_id' => 'ACT002',
                'contract_name' => 'Active Contract 2',
                'location' => 'Nabunturan',
                'duration' => '24 months',
                'budget' => 2000000,
                'start_date' => '2024-02-01',
                'end_date' => '2026-01-31',
                'status' => 'active',
            ],
            [
                'contract_id' => 'ACT003',
                'contract_name' => 'Active Contract 3',
                'location' => 'Sta. Cruz',
                'duration' => '6 months',
                'budget' => 500000,
                'start_date' => '2024-03-01',
                'end_date' => '2024-08-31',
                'status' => 'active',
            ],
            [
                'contract_id' => 'ACT004',
                'contract_name' => 'Active Contract 4',
                'location' => 'Digos',
                'duration' => '18 months',
                'budget' => 1500000,
                'start_date' => '2024-04-01',
                'end_date' => '2025-09-30',
                'status' => 'active',
            ],
        ];

        // Hardcoded data for past contracts
        $pastContracts = [
            [
                'contract_id' => 'PAST001',
                'contract_name' => 'Past Contract 1',
                'location' => 'Panabo',
                'duration' => '10 months',
                'budget' => 800000,
                'start_date' => '2022-01-01',
                'end_date' => '2022-10-31',
                'status' => 'past',
            ],
            [
                'contract_id' => 'PAST002',
                'contract_name' => 'Past Contract 2',
                'location' => 'Seattle, WA',
                'duration' => '8 months',
                'budget' => 600000,
                'start_date' => '2022-11-01',
                'end_date' => '2023-06-30',
                'status' => 'past',
            ],
            [
                'contract_id' => 'PAST003',
                'contract_name' => 'Past Contract 3',
                'location' => 'San Francisco, CA',
                'duration' => '5 months',
                'budget' => 400000,
                'start_date' => '2021-05-01',
                'end_date' => '2021-10-31',
                'status' => 'past',
            ],
            [
                'contract_id' => 'PAST004',
                'contract_name' => 'Past Contract 4',
                'location' => 'Atlanta, GA',
                'duration' => '12 months',
                'budget' => 900000,
                'start_date' => '2021-01-01',
                'end_date' => '2021-12-31',
                'status' => 'past',
            ],
            [
                'contract_id' => 'PAST005',
                'contract_name' => 'Past Contract 5',
                'location' => 'Boston, MA',
                'duration' => '15 months',
                'budget' => 750000,
                'start_date' => '2020-06-01',
                'end_date' => '2021-09-30',
                'status' => 'past',
            ],
        ];

        // Insert active contracts
        foreach ($activeContracts as $contract) {
            Contract::create($contract);
        }

        // Insert past contracts
        foreach ($pastContracts as $contract) {
            Contract::create($contract);
        }
    }
}