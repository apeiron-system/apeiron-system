<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PayItemProgressAccomplishmentSeeder extends Seeder
{
    //$table->id();
    //$table->timestamps();
    //$table->foreignId('accomplishment_report_id')->constrained('progress_accomplishment', 'payitem_progress_id')->cascadeOnUpdate()->cascadeOnDelete();
    //$table->integer('contract_part_id');
    //$table->integer('pay_item_no');
    //$table->double('quantity_this_period');
    //$table->double('amount_this_period');
    //$table->double('to_date_weight_percent');
    //$table->double('balance_weight_percent');
    //$table->string('remarks');

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('pay_item_progress_accomplishments')->insert([
            [
                'id' => ,
                'accomplishment_report_id' => ,
                'progress_id' => ,
                'contract_part_id'' => ,
                'quantity_this_period' => ,
                'amount_this_period' => ,
                'to_date_weight_percent' => ,
                'balance_weight_percent' => ,
                'remarks' => ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                //Add more items here Change the one above as it is a sample
            ],
        ]);
    }
}
