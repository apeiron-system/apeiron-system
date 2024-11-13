<<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobOrderProgressAccomplishment extends Seeder
{
    // $table->id();
    // $table->timestamps();
    // $table->foreignId('job_order_no');
    // $table->foreignId('checked_by_employee_id');
    // $table->foreignId('reviewed_by_employee_id');
    // $table->foreignId('recommend_approval_employee_id');
    // $table->foreignId('approved_by_employee_id');
    // $table->integer('bill_no');
    // $table->date('date');
    // $table->string('type');
    // $table->string('period_covered');
    // $table->string('progress_billing');
    // $table->double('total_partial_payments');
    // public function run(): void

public function run(): void 
    {
        DB:table('job_order_progress_accomplishment_table')->insert([
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => "",
                'period_covered' => "",
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => "10-10-2003",
                'period_covered' => "",
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => "10-10-2003",
                'period_covered' => "",
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => "10-10-2003",
                'period_covered' => "",
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => May 27, 2024,
                'period_covered' => ,
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => May 27, 2024,
                'period_covered' => ,
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => May 27, 2024,
                'period_covered' => ,
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => May 27, 2024,
                'period_covered' => ,
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => May 27, 2024,
                'period_covered' => ,
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],
            [
                'id' => 1,
                'job_order_id'=> 1,
                'checked_by_employee_id' => 1,
                'reviewed_by_employee_id' => 1, 
                'approved_by_employee_id'=> 1,
                'bill_no' => 1,
                'date' => May 27, 2024,
                'period_covered' => ,
                'total_partial_payments'=> 200.00,
                'created_at'=> now(),
                'updated_at' => now(),
                
            ],


        ])
}
}