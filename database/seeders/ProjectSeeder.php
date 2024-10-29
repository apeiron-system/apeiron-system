<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Sample data for projects
        Project::create([
            'project_contract_id' => 1, // Assuming a contract with ID 1 exists
            'name' => 'Project Alpha',
            'description' => 'This is a description for Project Alpha.',
            'start_date' => '2024-01-01',
            'end_date' => '2024-06-30',
            'budget' => 15000.00,
            'progress' => 25.0,
            'status' => 'in-progress',
        ]);

        Project::create([
            'project_contract_id' => 1, // Assuming a contract with ID 1 exists
            'name' => 'Project Beta',
            'description' => 'This is a description for Project Beta.',
            'start_date' => '2024-02-01',
            'end_date' => '2024-07-15',
            'budget' => 20000.00,
            'progress' => 50.0,
            'status' => 'in-progress',
        ]);

        // Add more projects as needed
    }
}
