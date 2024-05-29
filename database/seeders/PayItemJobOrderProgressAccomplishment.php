<<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PayItemJobOrderProgressAccomplishment extends Seeder
{
    // $table->id();
    // $table->timestamps();
    // $table->foreignId('job_accomplishment_report_id');
    // $table->foreignId('job_order_no');
    // $table->foreignId('job_order_part');
    // $table->foreignId('pay_item_no');
    // $table->double('quantity_this_period');
    // $table->double('amount_during');
    // $table->double('accomplishment_to_date');

public function run(): void 
    {
        DB:table('pay_item_job_order_progress_accomplishment_table')->insert([
            [
                'id' => 1,
                'job_accomplishment_report_id'=> 1,
                'job_order_no' => 1,
                'job_order_part' => 1, 
                'pay_item_no'=> 1,
                'quantity_this_period' => 1,
                'amount_during' => "May 27, 2024",
                'accomplishment_to_date' => "",
                'created_at'=> now(),
                'updated_at' => now(),
                
            ]
        ]
        )
            }}
