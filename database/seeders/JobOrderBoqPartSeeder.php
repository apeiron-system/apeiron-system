<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobOrderBoqPartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Data structure from the provided React state
        $data = [
            [
                'boq_id' => 1, // Replace with an existing boq_id from your 'boq' table
                'part_name' => 'Part A',
                'item_no' => '001',
                'description' => 'Excavation',
                'unit' => 'sq.m',
                'quantity' => 50,
                'unit_cost' => 200,
                'amount' => 10000,
                'subtotal' => 10000, // amount * quantity
                'weight' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'boq_id' => 1,
                'part_name' => 'Part A',
                'item_no' => '002',
                'description' => 'Concrete Pouring',
                'unit' => 'cu.m',
                'quantity' => 30,
                'unit_cost' => 250,
                'amount' => 7500,
                'subtotal' => 7500,
                'weight' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'boq_id' => 1,
                'part_name' => 'Part B',
                'item_no' => '003',
                'description' => 'Steel Rebar',
                'unit' => 'kg',
                'quantity' => 100,
                'unit_cost' => 150,
                'amount' => 15000,
                'subtotal' => 15000,
                'weight' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'boq_id' => 1,
                'part_name' => 'Part B',
                'item_no' => '004',
                'description' => 'Formwork',
                'unit' => 'sq.m',
                'quantity' => 40,
                'unit_cost' => 180,
                'amount' => 7200,
                'subtotal' => 7200,
                'weight' => 25,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'boq_id' => 1,
                'part_name' => 'Part C',
                'item_no' => '005',
                'description' => 'Labor',
                'unit' => 'hours',
                'quantity' => 200,
                'unit_cost' => 120,
                'amount' => 24000,
                'subtotal' => 24000,
                'weight' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'boq_id' => 1,
                'part_name' => 'Part C',
                'item_no' => '006',
                'description' => 'Electrical Wiring',
                'unit' => 'm',
                'quantity' => 500,
                'unit_cost' => 50,
                'amount' => 25000,
                'subtotal' => 25000,
                'weight' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert the data into the boq_part table
        DB::table('boq_part')->insert($data);
    }
}
