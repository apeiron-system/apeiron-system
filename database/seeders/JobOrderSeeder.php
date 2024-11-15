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
                        'itemWorks' => 'Work Item A1 description',
                        'progress' => 60,
                        'status' => 'on-going',
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
                        'itemWorks' => 'Work Item A2 description',
                        'progress' => 50,
                        'status' => 'on-going',
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
                        'itemWorks' => 'Work Item A3 description',
                        'progress' => 40,
                        'status' => 'on-going',
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
                        'itemWorks' => 'Work Item B1 description',
                        'progress' => 30,
                        'status' => 'completed',
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
                        'itemWorks' => 'Work Item B2 description',
                        'progress' => 20,
                        'status' => 'on-going',
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
                        'itemWorks' => 'Work Item B3 description',
                        'progress' => 10,
                        'status' => 'on-going',
                    ],
                ],
                3 => [ // Project 3
                    [
                        'jo_name' => 'Job Order C1',
                        'location' => 'Location 1',
                        'period_covered' => 'Jan 2024 - Feb 2024',
                        'supplier' => 'Supplier 4',
                        'dateNeeded' => '2024-02-01',
                        'preparedBy' => 'David King',
                        'checkedBy' => 'Sophia Harris',
                        'approvedBy' => 'James Clark',
                        'itemWorks' => 'Work Item B1 description',
                        'progress' => 30,
                        'status' => 'on-going',
                    ],
                    [
                        'jo_name' => 'Job Order C2',
                        'location' => 'Location 2',
                        'period_covered' => 'Mar 2024 - Apr 2024',
                        'supplier' => 'Supplier 5',
                        'dateNeeded' => '2024-04-01',
                        'preparedBy' => 'Olivia Scott',
                        'checkedBy' => 'Liam Moore',
                        'approvedBy' => 'Daniel Lee',
                        'itemWorks' => 'Work Item B2 description',
                        'progress' => 20,
                        'status' => 'completed',
                    ],
                    [
                        'jo_name' => 'Job Order C3',
                        'location' => 'Location 3',
                        'period_covered' => 'May 2024 - Jun 2024',
                        'supplier' => 'Supplier 6',
                        'dateNeeded' => '2024-06-01',
                        'preparedBy' => 'Lucas Young',
                        'checkedBy' => 'Emma Taylor',
                        'approvedBy' => 'Noah White',
                        'itemWorks' => 'Work Item B3 description',
                        'progress' => 10,
                        'status' => 'on-going',
                    ],
                ],
            ],
            // You can add more contracts here with similar structure for their projects and job orders...
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
