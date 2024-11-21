<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobOrder;

class JobOrderSeeder extends Seeder
{
    public function run()
    {
        // Example of job orders for each project
        $jobOrdersData = [
            // Job Orders for projects under contract with ID 1
            1 => [
                1 => [ // Project 1
                    [
                        'jo_name' => 'Job Order A1',
                        'location' => 'Location 1',
                        'period_covered' => 'Jan 2024 - Feb 2024',
                        'supplier' => 'Supplier 1',
                        'dateNeeded' => '2024-02-01',
                        'preparedBy' => 'John Doe',
                        'checkedBy' => 'Jane Doe',
                        'approvedBy' => 'Mark Smith',
                        'itemWorks' => 'Item Work A1 description',
                        'budget' => 100000.00, // Added budget
                    ],
                    [
                        'jo_name' => 'Job Order A2',
                        'location' => 'Location 2',
                        'period_covered' => 'Mar 2024 - Apr 2024',
                        'supplier' => 'Supplier 2',
                        'dateNeeded' => '2024-04-01',
                        'preparedBy' => 'Alice Green',
                        'checkedBy' => 'Bob White',
                        'approvedBy' => 'Eva Black',
                        'itemWorks' => 'Item Work A2 description',
                        'budget' => 200000.00, // Added budget
                    ],
                    [
                        'jo_name' => 'Job Order A3',
                        'location' => 'Location 3',
                        'period_covered' => 'May 2024 - Jun 2024',
                        'supplier' => 'Supplier 3',
                        'dateNeeded' => '2024-06-01',
                        'preparedBy' => 'Tom Brown',
                        'checkedBy' => 'Rachel Blue',
                        'approvedBy' => 'Sarah Yellow',
                        'itemWorks' => 'Item Work A3 description',
                        'budget' => 150000.00, // Added budget
                    ],
                ],
                2 => [ // Project 2
                    [
                        'jo_name' => 'Job Order B1',
                        'location' => 'Location 1',
                        'period_covered' => 'Jan 2024 - Feb 2024',
                        'supplier' => 'Supplier 4',
                        'dateNeeded' => '2024-02-01',
                        'preparedBy' => 'David King',
                        'checkedBy' => 'Sophia Harris',
                        'approvedBy' => 'James Clark',
                        'itemWorks' => 'Item Work B1 description',
                        'budget' => 120000.00, // Added budget
                    ],
                    [
                        'jo_name' => 'Job Order B2',
                        'location' => 'Location 2',
                        'period_covered' => 'Mar 2024 - Apr 2024',
                        'supplier' => 'Supplier 5',
                        'dateNeeded' => '2024-04-01',
                        'preparedBy' => 'Olivia Scott',
                        'checkedBy' => 'Liam Moore',
                        'approvedBy' => 'Daniel Lee',
                        'itemWorks' => 'Item Work B2 description',
                        'budget' => 180000.00, // Added budget
                    ],
                    [
                        'jo_name' => 'Job Order B3',
                        'location' => 'Location 3',
                        'period_covered' => 'May 2024 - Jun 2024',
                        'supplier' => 'Supplier 6',
                        'dateNeeded' => '2024-06-01',
                        'preparedBy' => 'Lucas Young',
                        'checkedBy' => 'Emma Taylor',
                        'approvedBy' => 'Noah White',
                        'itemWorks' => 'Item Work B3 description',
                        'budget' => 140000.00, // Added budget
                    ],
                ],
                3 => [ // Project 3
                    [
                        'jo_name' => 'Job Order C1',
                        'location' => 'Location 1',
                        'period_covered' => 'Jan 2024 - Feb 2024',
                        'supplier' => 'Supplier 7',
                        'dateNeeded' => '2024-02-01',
                        'preparedBy' => 'Michael Dean',
                        'checkedBy' => 'Sophia Wright',
                        'approvedBy' => 'James Parker',
                        'itemWorks' => 'Item Work C1 description',
                        'budget' => 130000.00, // Added budget
                    ],
                    [
                        'jo_name' => 'Job Order C2',
                        'location' => 'Location 2',
                        'period_covered' => 'Mar 2024 - Apr 2024',
                        'supplier' => 'Supplier 8',
                        'dateNeeded' => '2024-04-01',
                        'preparedBy' => 'Emma Hall',
                        'checkedBy' => 'Oliver Scott',
                        'approvedBy' => 'Daniel Young',
                        'itemWorks' => 'Item Work C2 description',
                        'budget' => 170000.00, // Added budget
                    ],
                    [
                        'jo_name' => 'Job Order C3',
                        'location' => 'Location 3',
                        'period_covered' => 'May 2024 - Jun 2024',
                        'supplier' => 'Supplier 9',
                        'dateNeeded' => '2024-06-01',
                        'preparedBy' => 'Ethan Martin',
                        'checkedBy' => 'Lucas Anderson',
                        'approvedBy' => 'Sophia Hill',
                        'itemWorks' => 'Item Work C3 description',
                        'budget' => 160000.00, // Added budget
                    ],
                ],
            ],
        ];

        // Loop through each contract
        foreach ($jobOrdersData as $contractId => $projects) {
            foreach ($projects as $projectId => $jobOrders) {
                foreach ($jobOrders as $jobOrder) {
                    JobOrder::create(array_merge([
                        'contract_id' => $contractId,
                        'project_id' => $projectId
                    ], $jobOrder));
                }
            }
        }
    }
}
