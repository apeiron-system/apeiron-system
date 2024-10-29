<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectContractSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('project_contract')->insert([
            [
                'id' => 1, // Ensure this ID aligns with the JobOrderSeeder reference
                'contract_name' => 'Contract A',
                'description' => 'Description for Contract A',
                'location' => 'Location A',
                'designation' => 'Designation A',
                'date' => now(),
                'submitted_by_employee_id' => 1,
                'signing_authority_employee_id' => 2,
                'authorized_representative_employee_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2, // Ensure this ID aligns with the JobOrderSeeder reference
                'contract_name' => 'Contract B',
                'description' => 'Description for Contract B',
                'location' => 'Location B',
                'designation' => 'Designation B',
                'date' => now(),
                'submitted_by_employee_id' => 2,
                'signing_authority_employee_id' => 3,
                'authorized_representative_employee_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3, // Ensure this ID aligns with the JobOrderSeeder reference
                'contract_name' => 'Contract C',
                'description' => 'Description for Contract C',
                'location' => 'Location C',
                'designation' => 'Designation C',
                'date' => now(),
                'submitted_by_employee_id' => 3,
                'signing_authority_employee_id' => 4,
                'authorized_representative_employee_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
