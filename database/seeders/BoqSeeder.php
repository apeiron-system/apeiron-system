<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BoQ;
use App\Models\JobOrder;

class BoqSeeder extends Seeder
{
    public function run()
    {
        // Step 1: Retrieve all job orders from the database
        $jobOrders = JobOrder::all();  // Fetch all job orders

        // If no job orders exist, log a message and stop the seeding
        if ($jobOrders->isEmpty()) {
            echo "No job orders found. Please ensure job orders are present in the database.";
            return;
        }

        // Step 2: Iterate over each job order and insert at least one BoQ for each job order
        foreach ($jobOrders as $jobOrder) {
            // Ensure at least one BoQ is created for each job order
            $boqData = [
                'jo_no' => $jobOrder->jo_no,   // Associate the BoQ with the job order
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Insert the BoQ data into the boq table
            BoQ::create($boqData);
        }
    }
}
