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
        $projectParts = DB::table('project_part')->get()->keyBy('description');
        $items = DB::table('items')->get();

        if ($projectParts->isEmpty() || $items->isEmpty()) {
            $this->command->info('Ensure that ProjectPartSeeder and ItemSeeder have been run first.');
            return;
        }

        // Limit to the first 10 items
        $itemsToInsert = $items->take(10); // take first 10 items

        // Loop through each project part
        foreach ($projectParts as $partDescription => $projectPart) {
            // Set the contract_id to 1
            $contractId = 1;

            // Loop through the first 10 items (we ensure this is only inserted once per project part)
            foreach ($itemsToInsert as $item) {
                // Check if the item has already been inserted for the current contract and project part
                $existingItem = DB::table('project_part_items')
                    ->where('contract_id', $contractId)
                    ->where('project_part_id', $projectPart->id)
                    ->where('item_id', $item->id)
                    ->exists();

                // If it doesn't exist, insert the item
                if (!$existingItem) {
                    // Create dummy quantities or customize them based on your needs
                    $dummyQuantity = rand(1, 100); // random quantity for demonstration
                    
                    // Insert project part items with timestamps
                    DB::table('project_part_items')->insert([
                        'contract_id' => $contractId,  // Always use contract_id = 1
                        'project_part_id' => $projectPart->id,
                        'item_id' => $item->id,
                        'quantity' => $dummyQuantity,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        $this->command->info('Project parts and items have been populated successfully with 10 items per project part, using contract_id = 1.');
    }
}
