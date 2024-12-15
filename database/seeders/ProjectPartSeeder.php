<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectPartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch projects by their IDs (only Project 1 and Project 2)
        $projects = DB::table('project')
            ->select('id', 'project_name')
            ->whereIn('id', [1, 2]) // Include only the first two projects
            ->get()
            ->keyBy('id');

        if ($projects->isEmpty()) {
            $this->command->info('No matching projects found in the "project" table. Please check the ProjectSeeder.');
            return;
        }

        // Fetch all job orders
        $jobOrders = DB::table('job_orders')
            ->select('jo_no')
            ->get()
            ->pluck('jo_no'); // Extract `jo_no` as a flat collection

        if ($jobOrders->isEmpty() || $jobOrders->count() < 2) {
            $this->command->info('Not enough job orders found. Please ensure JobOrderSeeder is properly populated.');
            return;
        }

        // Access the second job order (`jo_no`)
        $secondJobOrder = $jobOrders->slice(1, 1)->first(); // Get the second element

        // Define unique project parts for each project
        $projectPartsData = [
            1 => [ // Project 1 parts
                [
                    'description' => 'Foundation Work - Tower 1',
                    'parent_id' => null,
                    'jo_no' => $jobOrders->first(), // Assign the first job order
                ],
                [
                    'description' => 'Electrical Installation - Tower 1',
                    'parent_id' => null,
                    'jo_no' => $jobOrders->first(),
                ],
            ],
            2 => [ // Project 2 parts
                [
                    'description' => 'Structural Work - Building A',
                    'parent_id' => null,
                    'jo_no' => $secondJobOrder, // Assign the second job order
                ],
                [
                    'description' => 'Plumbing Work - Building A',
                    'parent_id' => null,
                    'jo_no' => $secondJobOrder,
                ],
            ],
        ];

        // Prepare data for insertion
        $data = [];
        foreach ($projectPartsData as $projectId => $parts) {
            foreach ($parts as $part) {
                $data[] = [
                    'description' => $part['description'],
                    'project_id' => $projectId,
                    'parent_id' => $part['parent_id'],
                    'jo_no' => $part['jo_no'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Insert data into project_part table
        DB::table('project_part')->insert($data);

        $this->command->info('Project parts for Project 1 and Project 2 have been populated successfully.');
    }
}