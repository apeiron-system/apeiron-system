<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectModel;
use App\Models\EmployeeModel;

class JobOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Fetch specific employees for assigning roles
        $preparedBy = EmployeeModel::where('email_address', 'john.doe@example.com')->first();
        $checkedBy = EmployeeModel::where('email_address', 'jane.smith@example.com')->first();
        $approvedBy = EmployeeModel::where('email_address', 'alan.brown@example.com')->first();

        // Ensure the employees are found
        if (!$preparedBy || !$checkedBy || !$approvedBy) {
            throw new \Exception('Required employees not found. Please check the EmployeeSeeder.');
        }

        // Helper function to construct full name
        $getFullName = function ($employee) {
            return trim("{$employee->first_name} {$employee->middle_name} {$employee->last_name}");
        };

        // Get the projects
        $projects = ProjectModel::all();

        // Ensure there are projects to assign job orders to
        if ($projects->isEmpty()) {
            throw new \Exception('No projects found. Please check the ProjectSeeder.');
        }

        // Insert job order records
        foreach ($projects as $project) {
            DB::table('job_orders')->insert([
                [
                    'jo_name' => 'Job Order for ' . $project->project_name,
                    'location' => $project->street_address . ', ' . $project->barangay . ', ' . $project->city . ', ' . $project->province,
                    'supplier' => 'Supplier ' . $project->id,
                    'itemWorks' => 'material', // Adjust as necessary (material, labor, equipment)
                    'period_covered' => '2024-01-01 to 2024-12-31', // Example period, adjust as necessary
                    'dateNeeded' => now()->addDays(10), // Example date, adjust as necessary
                    'preparedBy' => $getFullName($preparedBy),
                    'checkedBy' => $getFullName($checkedBy),
                    'approvedBy' => $getFullName($approvedBy),
                    'status' => 'pending', // Default status
                    'contract_id' => $project->contract_id,
                    'project_id' => $project->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}
