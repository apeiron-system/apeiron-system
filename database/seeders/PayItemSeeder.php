<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PayItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pay_item')->insert([
            [
                'date_modified' => Carbon::now()->subDays(10)->format('Y-m-d'),
                'description' => 'Concrete work for foundation',
                'location' => 'Site A',
                'unit' => 100,
                'unit_bid_cost' => 500.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'date_modified' => Carbon::now()->subDays(5)->format('Y-m-d'),
                'description' => 'Steel reinforcements',
                'location' => 'Site B',
                'unit' => 50,
                'unit_bid_cost' => 1200.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'date_modified' => Carbon::now()->subDays(3)->format('Y-m-d'),
                'description' => 'Masonry work',
                'location' => 'Site C',
                'unit' => 200,
                'unit_bid_cost' => 300.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
