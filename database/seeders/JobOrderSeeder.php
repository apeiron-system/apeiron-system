<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('job_order')->insert([
            [
                'job_order_no' => 'JO-001',
                'location' => 'Site A',
                'period_covered' => '2024-01-01 to 2024-01-31',
                'supplier' => 'Supplier A',
                'date_needed' => '2024-01-15',
                'prepared_by' => 'John Doe',
                'checked_by' => 'Jane Smith',
                'approved_by' => 'Michael Johnson',
                'piece_work_subcontractor' => 'Subcontractor A',
                'grand_total' => 50000,
                'failed_at' => now(), // Set a default value
                'jo_contract_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'job_order_no' => 'JO-002',
                'location' => 'Site B',
                'period_covered' => '2024-02-01 to 2024-02-28',
                'supplier' => 'Supplier B',
                'date_needed' => '2024-02-15',
                'prepared_by' => 'Alice Brown',
                'checked_by' => 'Bob White',
                'approved_by' => 'Lisa Black',
                'piece_work_subcontractor' => 'Subcontractor B',
                'grand_total' => 75000,
                'failed_at' => now(), // Set a default value
                'jo_contract_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'job_order_no' => 'JO-003',
                'location' => 'Site C',
                'period_covered' => '2024-03-01 to 2024-03-31',
                'supplier' => 'Supplier C',
                'date_needed' => '2024-03-15',
                'prepared_by' => 'Chris Green',
                'checked_by' => 'Patricia Blue',
                'approved_by' => 'George Red',
                'piece_work_subcontractor' => 'Subcontractor C',
                'grand_total' => 100000,
                'failed_at' => now(), // Set a default value
                'jo_contract_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
