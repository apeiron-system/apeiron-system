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
        // Fetch projects by their names for clarity
        $projects = DB::table('project')
            ->select('id', 'project_name')
            ->get()
            ->keyBy('project_name');

        if ($projects->isEmpty()) {
            $this->command->info('No projects found in the "project" table. Please run the ProjectSeeder first.');
            return;
        }

        // Fetch job orders for clarity
        $jobOrders = DB::table('job_orders')
            ->select('jo_no')
            ->get()
            ->keyBy('jo_no');

        if ($jobOrders->isEmpty()) {
            $this->command->info('No job orders found in the "job_orders" table. Please run the JobOrderSeeder first.');
            return;
        }

        // Insert project parts for each project
        $data = [
            // Project parts for "Residential Tower - Phase 1"
            [
                'description' => 'Foundation Work',
                'project_id' => $projects['Residential Tower - Phase 1']->id,
                'parent_id' => null, // Root
                'jo_no' => $jobOrders->keys()->first(), // Assign the first job order (replace with actual logic if needed)
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Structural Work',
                'project_id' => $projects['Residential Tower - Phase 1']->id,
                'parent_id' => null, // Root
                'jo_no' => $jobOrders->keys()->first(), // Assign the first job order
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Electrical Installation',
                'project_id' => $projects['Residential Tower - Phase 1']->id,
                'parent_id' => null,
                'jo_no' => $jobOrders->keys()->first(), // Assign the first job order
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ];

        DB::table('project_part')->insert($data);
    }
}
