<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Contract;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        $projectsData = [
            // Projects for contract with ID 1
            1 => [
                [
                    'item_no' => 1,
                    'description' => 'Foundation Excavation',
                    'unit' => 'meters',
                    'qty' => 100,
                    'unit_cost' => 500.00,
                    'budget' => 50000.00,
                    'progress' => 70.0,
                    'status' => 'on-going',
                ],
                [
                    'item_no' => 2,
                    'description' => 'Concrete Slab Installation',
                    'unit' => 'sq meters',
                    'qty' => 150,
                    'unit_cost' => 600.00,
                    'budget' => 90000.00,
                    'progress' => 50.0,
                    'status' => 'on-going',
                ],
                [
                    'item_no' => 3,
                    'description' => 'Column Setup',
                    'unit' => 'pcs',
                    'qty' => 30,
                    'unit_cost' => 800.00,
                    'budget' => 24000.00,
                    'progress' => 40.0,
                    'status' => 'on-going',
                ],
            ],
            // Projects for contract with ID 2
            2 => [
                [
                    'item_no' => 1,
                    'description' => 'Electrical Wiring',
                    'unit' => 'meters',
                    'qty' => 200,
                    'unit_cost' => 300.00,
                    'budget' => 60000.00,
                    'progress' => 30.0,
                    'status' => 'on-going',
                ],
                [
                    'item_no' => 2,
                    'description' => 'Plumbing Installation',
                    'unit' => 'meters',
                    'qty' => 100,
                    'unit_cost' => 400.00,
                    'budget' => 40000.00,
                    'progress' => 25.0,
                    'status' => 'on-going',
                ],
                [
                    'item_no' => 3,
                    'description' => 'HVAC System Installation',
                    'unit' => 'pcs',
                    'qty' => 10,
                    'unit_cost' => 1000.00,
                    'budget' => 10000.00,
                    'progress' => 20.0,
                    'status' => 'on-going',
                ],
            ],
            // Projects for contract with ID 3
            3 => [
                [
                    'item_no' => 1,
                    'description' => 'Roof Framing',
                    'unit' => 'sq meters',
                    'qty' => 120,
                    'unit_cost' => 700.00,
                    'budget' => 84000.00,
                    'progress' => 100.0,
                    'status' => 'completed',
                ],
                [
                    'item_no' => 2,
                    'description' => 'Roof Sheathing',
                    'unit' => 'sq meters',
                    'qty' => 120,
                    'unit_cost' => 500.00,
                    'budget' => 60000.00,
                    'progress' => 60.0,
                    'status' => 'on-going',
                ],
                [
                    'item_no' => 3,
                    'description' => 'Waterproofing',
                    'unit' => 'liters',
                    'qty' => 50,
                    'unit_cost' => 200.00,
                    'budget' => 10000.00,
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
