<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Employee; // Ensure this is the correct namespace for your Employee model
use App\Models\EmployeeModel;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch specific employees for assigning roles
        $signingAuthority = EmployeeModel::where('email_address', 'diana.prince@example.com')->first();
        $submittedBy = EmployeeModel::where('email_address', 'bruce.wayne@example.com')->first();

        // Ensure the employees are found
        if (!$signingAuthority || !$submittedBy) {
            throw new \Exception('Required employees not found. Please check the EmployeeSeeder.');
        }

        // Insert project records
        DB::table('project')->insert([
            // Projects for Contract 1
            [
                'project_name' => 'Residential Tower - Phase 1',
                'status' => 'ongoing',
                'street_address' => 'Block 7, Lot 12',
                'barangay' => 'Barangay 5',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8000',
                'country' => 'Philippines',
                'duration_in_days' => 150,
                'num_of_units' => 25,
                'abc_value' => 3000000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_name' => 'Residential Building Amenities',
                'status' => 'pending',
                'street_address' => 'Block 8, Lot 15',
                'barangay' => 'Barangay 5',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8000',
                'country' => 'Philippines',
                'duration_in_days' => 60,
                'num_of_units' => 5,
                'abc_value' => 500000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_name' => 'Residential Landscaping',
                'status' => 'completed',
                'street_address' => 'Block 9, Lot 20',
                'barangay' => 'Barangay 5',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8000',
                'country' => 'Philippines',
                'duration_in_days' => 30,
                'num_of_units' => 1,
                'abc_value' => 150000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Projects for Contract 2
            [
                'project_name' => 'Office Renovation - Lobby',
                'status' => 'ongoing',
                'street_address' => '123 Business Park',
                'barangay' => 'Barangay 10',
                'city' => 'Tagum City',
                'province' => 'Davao del Norte',
                'zip_code' => '8100',
                'country' => 'Philippines',
                'duration_in_days' => 45,
                'num_of_units' => 2,
                'abc_value' => 600000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_name' => 'Office Renovation - Conference Room',
                'status' => 'pending',
                'street_address' => '123 Business Park',
                'barangay' => 'Barangay 10',
                'city' => 'Tagum City',
                'province' => 'Davao del Norte',
                'zip_code' => '8100',
                'country' => 'Philippines',
                'duration_in_days' => 30,
                'num_of_units' => 1,
                'abc_value' => 400000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_name' => 'Office Renovation - Pantry',
                'status' => 'completed',
                'street_address' => '123 Business Park',
                'barangay' => 'Barangay 10',
                'city' => 'Tagum City',
                'province' => 'Davao del Norte',
                'zip_code' => '8100',
                'country' => 'Philippines',
                'duration_in_days' => 15,
                'num_of_units' => 1,
                'abc_value' => 200000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Projects for Contract 3
            [
                'project_name' => 'Bridge Foundation',
                'status' => 'completed',
                'street_address' => 'National Highway',
                'barangay' => 'Barangay 2',
                'city' => 'Panabo City',
                'province' => 'Davao del Norte',
                'zip_code' => '8115',
                'country' => 'Philippines',
                'duration_in_days' => 120,
                'num_of_units' => 1,
                'abc_value' => 1500000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_name' => 'Bridge Decking',
                'status' => 'ongoing',
                'street_address' => 'National Highway',
                'barangay' => 'Barangay 2',
                'city' => 'Panabo City',
                'province' => 'Davao del Norte',
                'zip_code' => '8115',
                'country' => 'Philippines',
                'duration_in_days' => 180,
                'num_of_units' => 1,
                'abc_value' => 2500000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'project_name' => 'Bridge Painting',
                'status' => 'ongoing',
                'street_address' => 'National Highway',
                'barangay' => 'Barangay 2',
                'city' => 'Panabo City',
                'province' => 'Davao del Norte',
                'zip_code' => '8115',
                'country' => 'Philippines',
                'duration_in_days' => 30,
                'num_of_units' => 1,
                'abc_value' => 500000.00,
                'submitted_by_employee_id' => $submittedBy->id,
                'signing_authority_employee_id' => $signingAuthority->id,
                'contract_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
