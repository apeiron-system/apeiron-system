<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectPartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch the necessary data
        $contracts = DB::table('contract')->pluck('id', 'contract_name');
        $projectParts = DB::table('project_part')->get()->keyBy('description');
        $items = DB::table('items')->get()->keyBy('description');

        if ($contracts->isEmpty() || $projectParts->isEmpty() || $items->isEmpty()) {
            $this->command->info('Ensure that ContractSeeder, ProjectPartSeeder, and ItemSeeder have been run first.');
            return;
        }

        // Loop through each contract (project)
        foreach ($contracts as $contractName => $contractId) {
            // Loop through each project part
            foreach ($projectParts as $partDescription => $projectPart) {
                // Here you can loop through items as well
                foreach ($items as $itemDescription => $item) {
                    // Create dummy quantities or customize them based on your needs
                    $dummyQuantity = rand(1, 100); // random quantity for demonstration
                    // Insert project part items with timestamps
                    DB::table('project_part_items')->insert([
                        'contract_id' => $contractId,
                        'project_part_id' => $projectPart->id,
                        'item_id' => $item->id,
                        'quantity' => $dummyQuantity,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        $this->command->info('Project parts and items have been populated successfully.');
    }
}
