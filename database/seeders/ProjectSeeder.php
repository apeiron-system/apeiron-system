<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        $projectsData = [
            // Projects for contract with ID 1
            1 => [
                [
                    'description' => 'Project A',
                    'progress' => 100.0,
                    'status' => 'completed',
                    'location' => 'Manila',
                ],
                [
                    'description' => 'Project B',
                    'progress' => 50.0,
                    'status' => 'on-going',
                    'location' => 'Cebu',
                ],
                [
                    'description' => 'Project C',
                    'progress' => 40.0,
                    'status' => 'on-going',
                    'location' => 'Davao',
                ],
            ],
            // Projects for contract with ID 2
            2 => [
                [
                    'description' => 'Project A',
                    'progress' => 30.0,
                    'status' => 'on-going',
                    'location' => 'Manila',
                ],
                [
                    'description' => 'Project B',
                    'progress' => 25.0,
                    'status' => 'on-going',
                    'location' => 'Cebu',
                ],
                [
                    'description' => 'Project C',
                    'progress' => 20.0,
                    'status' => 'on-going',
                    'location' => 'Iloilo',
                ],
            ],
            // Projects for contract with ID 3
            3 => [
                [
                    'description' => 'Project A',
                    'progress' => 100.0,
                    'status' => 'completed',
                    'location' => 'Davao',
                ],
                [
                    'description' => 'Project B',
                    'progress' => 60.0,
                    'status' => 'on-going',
                    'location' => 'Manila',
                ],
                [
                    'description' => 'Project C',
                    'progress' => 40.0,
                    'status' => 'on-going',
                    'location' => 'Cebu',
                ],
            ],
            // Projects for contract with ID 4
            4 => [
                [
                    'description' => 'Project A',
                    'progress' => 100.0,
                    'status' => 'completed',
                    'location' => 'Iloilo',
                ],
                [
                    'description' => 'Project B',
                    'progress' => 100.0,
                    'status' => 'completed',
                    'location' => 'Davao',
                ],
                [
                    'description' => 'Project C',
                    'progress' => 40.0,
                    'status' => 'on-going',
                    'location' => 'Manila',
                ],
            ],
            // Projects for contract with ID 5
            5 => [
                [
                    'description' => 'Project A',
                    'progress' => 10.0,
                    'status' => 'on-going',
                    'location' => 'Cebu',
                ],
                [
                    'description' => 'Project B',
                    'progress' => 10.0,
                    'status' => 'on-going',
                    'location' => 'Iloilo',
                ],
                [
                    'description' => 'Project C',
                    'progress' => 40.0,
                    'status' => 'on-going',
                    'location' => 'Davao',
                ],
            ],
        ];

        foreach ($projectsData as $contractId => $projects) {
            foreach ($projects as $project) {
                Project::create(array_merge(['contract_id' => $contractId], $project));
            }
        }
    }
}
