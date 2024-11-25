<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class JobOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch all projects
        $projects = DB::table('project')->get();

        // Verify projects exist
        if ($projects->isEmpty()) {
            throw new \Exception('No projects found. Please seed the Project table first.');
        }

        $jobOrders = [];

        foreach ($projects as $project) {
            // Assigning a job order for each project
            $jobOrders[] = [
                'contract_id' => $project->contract_id,
                'project_id' => $project->id,
                'jo_name' => "Job Order for {$project->project_name}",
                'location' => "{$project->street_address}, {$project->barangay}, {$project->city}",
                'supplier' => 'Default Supplier Co.',
                'itemWorks' => ['material', 'labor', 'equipment'][array_rand(['material', 'labor', 'equipment'])],
                'period_covered' => Carbon::now()->subDays(rand(10, 30))->format('Y-m-d') . ' to ' . Carbon::now()->addDays(rand(10, 30))->format('Y-m-d'),
                'dateNeeded' => Carbon::now()->addDays(rand(1, 15)),
                'preparedBy' => 'Default Preparer',
                'checkedBy' => 'Default Checker',
                'approvedBy' => 'Default Approver',
                'status' => ['pending', 'ongoing', 'canceled', 'completed'][array_rand(['pending', 'ongoing', 'canceled', 'completed'])],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert job orders into the database
        DB::table('job_orders')->insert($jobOrders);
    }
}
