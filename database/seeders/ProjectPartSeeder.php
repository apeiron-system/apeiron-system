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

        // Insert project parts for each project
        $data = [
            // Project parts for "Residential Tower - Phase 1"
            [
                'description' => 'Foundation Work',
                'project_id' => $projects['Residential Tower - Phase 1']->id,
                'parent_id' => null, // Root
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Structural Work',
                'project_id' => $projects['Residential Tower - Phase 1']->id,
                'parent_id' => null, // Root
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Electrical Installation',
                'project_id' => $projects['Residential Tower - Phase 1']->id,
                'parent_id' => 2, // Child of Structural Work
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Project parts for "Residential Building Amenities"
            [
                'description' => 'Swimming Pool Construction',
                'project_id' => $projects['Residential Building Amenities']->id,
                'parent_id' => null, // Root
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Playground Setup',
                'project_id' => $projects['Residential Building Amenities']->id,
                'parent_id' => null, // Root
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Project parts for "Office Renovation - Lobby"
            [
                'description' => 'Demolition Work',
                'project_id' => $projects['Office Renovation - Lobby']->id,
                'parent_id' => null, // Root
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Interior Design',
                'project_id' => $projects['Office Renovation - Lobby']->id,
                'parent_id' => 6, // Child of Demolition Work
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Project parts for "Bridge Foundation"
            [
                'description' => 'Pile Installation',
                'project_id' => $projects['Bridge Foundation']->id,
                'parent_id' => null, // Root
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Concrete Pouring',
                'project_id' => $projects['Bridge Foundation']->id,
                'parent_id' => 8, // Child of Pile Installation
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('project_part')->insert($data);
    }
}
