<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\ContractModel;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Fetch all available contracts
        $contracts = ContractModel::all();

        // Ensure contracts are available
        if ($contracts->isEmpty()) {
            throw new \Exception('No contracts found. Please check the ContractSeeder.');
        }

        // Define a large variety of construction-related items
        $constructionItems = [
            // Materials
            ['description' => 'Cement (bag)', 'type' => 'material', 'unit' => 'bag', 'unit_cost' => 280.00],
            ['description' => 'Sand (cubic meter)', 'type' => 'material', 'unit' => 'cubic meter', 'unit_cost' => 600.00],
            ['description' => 'Gravel (cubic meter)', 'type' => 'material', 'unit' => 'cubic meter', 'unit_cost' => 800.00],
            ['description' => 'Reinforcement Steel Bars (kg)', 'type' => 'material', 'unit' => 'kg', 'unit_cost' => 60.00],
            ['description' => 'Plywood (4x8 ft)', 'type' => 'material', 'unit' => 'sheet', 'unit_cost' => 850.00],
            ['description' => 'Hollow Blocks (pcs)', 'type' => 'material', 'unit' => 'pcs', 'unit_cost' => 15.00],
            ['description' => 'Concrete Nails (kg)', 'type' => 'material', 'unit' => 'kg', 'unit_cost' => 80.00],
            ['description' => 'Roofing Sheets (corrugated)', 'type' => 'material', 'unit' => 'sheet', 'unit_cost' => 500.00],
            ['description' => 'Paint (gallon)', 'type' => 'material', 'unit' => 'gallon', 'unit_cost' => 700.00],
            ['description' => 'PVC Pipes (10 ft)', 'type' => 'material', 'unit' => 'length', 'unit_cost' => 250.00],
            
            // Labor
            ['description' => 'Skilled Mason', 'type' => 'labor', 'unit' => 'hour', 'unit_cost' => 150.00],
            ['description' => 'Carpenter', 'type' => 'labor', 'unit' => 'hour', 'unit_cost' => 160.00],
            ['description' => 'Electrician', 'type' => 'labor', 'unit' => 'hour', 'unit_cost' => 180.00],
            ['description' => 'Plumber', 'type' => 'labor', 'unit' => 'hour', 'unit_cost' => 170.00],
            ['description' => 'Foreman', 'type' => 'labor', 'unit' => 'day', 'unit_cost' => 1200.00],
            ['description' => 'Painter', 'type' => 'labor', 'unit' => 'hour', 'unit_cost' => 140.00],
            
            // Equipment
            ['description' => 'Excavator Rental', 'type' => 'equipment', 'unit' => 'day', 'unit_cost' => 8000.00],
            ['description' => 'Concrete Mixer Rental', 'type' => 'equipment', 'unit' => 'day', 'unit_cost' => 2500.00],
            ['description' => 'Scaffolding Set Rental', 'type' => 'equipment', 'unit' => 'day', 'unit_cost' => 300.00],
            ['description' => 'Dump Truck Rental', 'type' => 'equipment', 'unit' => 'day', 'unit_cost' => 5000.00],
            ['description' => 'Jackhammer Rental', 'type' => 'equipment', 'unit' => 'day', 'unit_cost' => 1500.00],
            ['description' => 'Cranes', 'type' => 'equipment', 'unit' => 'hour', 'unit_cost' => 2000.00],
            ['description' => 'Generator Rental', 'type' => 'equipment', 'unit' => 'day', 'unit_cost' => 1800.00],
        ];

        // Insert the construction items for each contract
        foreach ($contracts as $contract) {
            foreach ($constructionItems as $item) {
                DB::table('items')->insert([
                    'contract_id' => $contract->id,
                    'description' => $item['description'],
                    'type' => $item['type'],
                    'unit' => $item['unit'],
                    'unit_cost' => $item['unit_cost'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
