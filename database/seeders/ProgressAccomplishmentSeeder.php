<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgressAccomplishmentSeeder extends Seeder
{
    // $table->id();
    // $table->timestamps();
    // $table->date('accomplishment_date');
    // $table->integer('contract_id');
    // $table->integer('prepared_by_employee_id');
    // $table->integer('approved_by_employee_id');
    // $table->integer('reviewed_by_employee_id');
    // $table->integer('checked_by_employee_id');


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('progress_accomplishments')->insert([
            [
            'id' => ,
            'accomplishment_date' => ,
            'contract_id' => ,
            'prepared_by_employee_id' => ,
            'approved_by_employee_id' => ,
            'reviewed_by_employee_id' => ,
            'checked_by_employee_id' => ,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
                //Add more items here Change the one above as it is a sample
            ],
        ]);
    }
}
