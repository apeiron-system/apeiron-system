<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobOrderPartSeeder extends Seeder
{
    public function run(): void
    {
        // Add this line to delete the table first
        DB::table('job_order_part')->delete();

        DB::table('job_order_part')->insert([
            [
                'id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
                'job_order_id' => 1,
                'part_name' => 'Part 1',
                'part_no' => 1,
                'description' => 'First part description',
                'unit' => 'piece',
                'quantity' => 1,
            ],
            [
                'id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
                'job_order_id' => 1,
                'part_name' => 'Part 2',
                'part_no' => 2,
                'description' => 'Second part description',
                'unit' => 'piece',
                'quantity' => 1,
            ],
            [
                'id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
                'job_order_id' => 2,
                'part_name' => 'Part 1',
                'part_no' => 1,
                'description' => 'Third part description',
                'unit' => 'piece',
                'quantity' => 1,
            ],
        ]);
    }
}