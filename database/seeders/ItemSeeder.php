<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Define the construction items
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

        // Fetch contracts to associate items
        $contracts = DB::table('contract')->pluck('id');

        if ($contracts->isEmpty()) {
            throw new \Exception('No contracts found. Please add entries in the "contract" table.');
        }

        // Assign items to each contract
        foreach ($contracts as $contractId) {
            foreach ($constructionItems as $item) {
                // Insert the item into the 'items' table
                $itemId = DB::table('items')->insertGetId([
                    'contract_id' => $contractId,
                    'description' => $item['description'],
                    'type' => $item['type'],
                    'unit' => $item['unit'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Insert the unit_cost into the item_prices table
                DB::table('item_prices')->insert([
                    'item_id' => $itemId,  // Use the inserted item_id
                    'unit_cost' => $item['unit_cost'],
                    'is_current' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
