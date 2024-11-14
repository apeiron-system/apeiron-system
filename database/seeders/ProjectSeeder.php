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
                ],
                [
                    'description' => 'Project B',
                    'progress' => 50.0,
                    'status' => 'on-going',
                ],
                [
                    'description' => 'Project C',
                    'progress' => 40.0,
                    'status' => 'on-going',
                ],
            ],
            // Projects for contract with ID 2
            2 => [
                [
                    'description' => 'Project A',
                    'progress' => 30.0,
                    'status' => 'on-going',
                ],
                [
                    'description' => 'Project B',
                    'progress' => 25.0,
                    'status' => 'on-going',
                ],
                [
                    'description' => 'Project C',
                    'progress' => 20.0,
                    'status' => 'on-going',
                ],
            ],
            // Projects for contract with ID 3
            3 => [
                [
                    'description' => 'Project A',
                    'progress' => 100.0,
                    'status' => 'completed',
                ],
                [
                    'description' => 'Project B',
                    'progress' => 60.0,
                    'status' => 'on-going',
                ],
                [
                    'description' => 'Project C',
                    'progress' => 40.0,
                    'status' => 'on-going',
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
