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
                'contract_name' => 'Contract 1',
                'location' => 'Toril',
                'duration' => '12 months',
                'budget' => 1000000,
                'start_date' => '2024-01-01',
                'end_date' => '2024-12-31',
                'status' => 'active',
            ],
            [
                'contract_name' => 'Contract 2',
                'location' => 'Nabunturan',
                'duration' => '24 months',
                'budget' => 2000000,
                'start_date' => '2024-02-01',
                'end_date' => '2026-01-31',
                'status' => 'active',
            ],
            [
                'contract_name' => 'Contract 3',
                'location' => 'Sta. Cruz',
                'duration' => '6 months',
                'budget' => 500000,
                'start_date' => '2024-03-01',
                'end_date' => '2024-08-31',
                'status' => 'active',
            ],
            [
                'contract_name' => 'Contract 4',
                'location' => 'Toril',
                'duration' => '3 years',
                'budget' => 500000,
                'start_date' => '2024-03-01',
                'end_date' => '2027-03-01',
                'status' => 'active',
            ],
            [
                'contract_name' => 'Contract 5',
                'location' => 'Panabo',
                'duration' => '4 years',
                'budget' => 500000,
                'start_date' => '2024-03-01',
                'end_date' => '2028-03-01',
                'status' => 'active',
            ],
        ];

        // Hardcoded data for past contracts
        $pastContracts = [
            [
                'contract_name' => 'Contract 6',
                'location' => 'Panabo',
                'duration' => '10 months',
                'budget' => 800000,
                'start_date' => '2022-01-01',
                'end_date' => '2022-10-31',
                'status' => 'past',
            ],
            [
                'contract_name' => 'Contract 7',
                'location' => 'Seattle, WA',
                'duration' => '8 months',
                'budget' => 600000,
                'start_date' => '2022-11-01',
                'end_date' => '2023-06-30',
                'status' => 'past',
            ],
            [
                'contract_name' => 'Contract 8',
                'location' => 'San Francisco, CA',
                'duration' => '5 months',
                'budget' => 400000,
                'start_date' => '2021-05-01',
                'end_date' => '2021-10-31',
                'status' => 'past',
            ],
            [
                'contract_name' => 'Contract 9',
                'location' => 'Atlanta, GA',
                'duration' => '12 months',
                'budget' => 900000,
                'start_date' => '2021-01-01',
                'end_date' => '2021-12-31',
                'status' => 'past',
            ],
            [
                'contract_name' => 'Contract 10',
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