<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PayItemJobOrderSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('pay_item_job_order')->insert([
            [
                'created_at' => now(),
                'updated_at' => now(),
                'equipment_name' => 'Excavator',
                'job_order_no' => 1,
                'job_order_part' => 1,
                'pi_job_order_id' => 1,
                'pi_jo_part_id' => 1,  // Added this field
            ],
            [
                'created_at' => now(),
                'updated_at' => now(),
                'equipment_name' => 'Bulldozer',
                'job_order_no' => 1,
                'job_order_part' => 2,
                'pi_job_order_id' => 1,
                'pi_jo_part_id' => 2,  // Added this field
            ],
            [
                'created_at' => now(),
                'updated_at' => now(),
                'equipment_name' => 'Crane',
                'job_order_no' => 2,
                'job_order_part' => 1,
                'pi_job_order_id' => 2,
                'pi_jo_part_id' => 3,  // Added this field
            ],
        ]);
    }
}
