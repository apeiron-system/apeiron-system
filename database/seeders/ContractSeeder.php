<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contract')->insert([
            [
                'contract_name' => 'Residential Building Project',
                'description' => 'A project for the construction of a residential building.',
                'status' => 'pending',
                'location' => 'Davao City, Philippines',
                'designation' => 'Engineer',
                'duration_in_days' => 180,
                'amount' => 2500000.00,
                'date' => '2024-11-01',
                'submitted_by_employee_id' => 1,  // John Doe
                'signing_authority_employee_id' => 2,  // Jane Smith
                'authorized_representative_employee_id' => 3,  // Alan Brown
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Office Renovation Project',
                'description' => 'Renovation of office spaces.',
                'status' => 'ongoing',
                'location' => 'Tagum City, Philippines',
                'designation' => 'Manager',
                'duration_in_days' => 90,
                'amount' => 1200000.00,
                'date' => '2024-10-15',
                'submitted_by_employee_id' => 2,  // Jane Smith
                'signing_authority_employee_id' => 3,  // Alan Brown
                'authorized_representative_employee_id' => 4,  // Sara Connor
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Bridge Construction',
                'description' => 'A major bridge construction project.',
                'status' => 'completed',
                'location' => 'Panabo City, Philippines',
                'designation' => 'Supervisor',
                'duration_in_days' => 365,
                'amount' => 5000000.00,
                'date' => '2023-08-01',
                'submitted_by_employee_id' => 3,  // Alan Brown
                'signing_authority_employee_id' => 4,  // Sara Connor
                'authorized_representative_employee_id' => 5,  // Peter Johnson
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Park Development',
                'description' => 'Development of a public park.',
                'status' => 'pending',
                'location' => 'Mati City, Philippines',
                'designation' => 'Architect',
                'duration_in_days' => 150,
                'amount' => 800000.00,
                'date' => '2024-12-01',
                'submitted_by_employee_id' => 4,  // Sara Connor
                'signing_authority_employee_id' => 5,  // Peter Johnson
                'authorized_representative_employee_id' => 6,  // Bruce Wayne
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Mall Expansion',
                'description' => 'Expansion of an existing mall.',
                'status' => 'ongoing',
                'location' => 'Samal Island, Philippines',
                'designation' => 'Technician',
                'duration_in_days' => 120,
                'amount' => 3000000.00,
                'date' => '2024-11-15',
                'submitted_by_employee_id' => 5,  // Peter Johnson
                'signing_authority_employee_id' => 6,  // Bruce Wayne
                'authorized_representative_employee_id' => 7,  // Clark Kent
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Office Building Project',
                'description' => 'Project for the construction of an office building.',
                'status' => 'completed',
                'location' => 'Digos City, Philippines',
                'designation' => 'Foreman',
                'duration_in_days' => 180,
                'amount' => 4000000.00,
                'date' => '2023-11-01',
                'submitted_by_employee_id' => 6,  // Bruce Wayne
                'signing_authority_employee_id' => 7,  // Clark Kent
                'authorized_representative_employee_id' => 8,  // Diana Prince
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Residential Complex',
                'description' => 'Development of a new residential complex.',
                'status' => 'pending',
                'location' => 'Compostela Valley, Philippines',
                'designation' => 'Inspector',
                'duration_in_days' => 300,
                'amount' => 3500000.00,
                'date' => '2024-12-15',
                'submitted_by_employee_id' => 7,  // Clark Kent
                'signing_authority_employee_id' => 8,  // Diana Prince
                'authorized_representative_employee_id' => 9,  // Barry West
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Highway Repair',
                'description' => 'Repairs and maintenance of a highway.',
                'status' => 'ongoing',
                'location' => 'Davao del Sur, Philippines',
                'designation' => 'Consultant',
                'duration_in_days' => 180,
                'amount' => 1500000.00,
                'date' => '2024-10-01',
                'submitted_by_employee_id' => 8,  // Diana Prince
                'signing_authority_employee_id' => 9,  // Barry West
                'authorized_representative_employee_id' => 10,  // Arthur Jones
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Water Supply Project',
                'description' => 'Project for water supply installation.',
                'status' => 'completed',
                'location' => 'Davao City, Philippines',
                'designation' => 'Surveyor',
                'duration_in_days' => 365,
                'amount' => 2000000.00,
                'date' => '2023-06-01',
                'submitted_by_employee_id' => 9,  // Barry West
                'signing_authority_employee_id' => 10,  // Arthur Jones
                'authorized_representative_employee_id' => 1,  // John Doe
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'contract_name' => 'Seaport Construction',
                'description' => 'Construction of a new seaport.',
                'status' => 'pending',
                'location' => 'Davao del Norte, Philippines',
                'designation' => 'Surveyor',
                'duration_in_days' => 365,
                'amount' => 7000000.00,
                'date' => '2024-11-25',
                'submitted_by_employee_id' => 10,  // Arthur Jones
                'signing_authority_employee_id' => 1,  // John Doe
                'authorized_representative_employee_id' => 2,  // Jane Smith
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
