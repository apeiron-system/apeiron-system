<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pay_item_progress_accomplishment', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('accomplishment_report_id')->constrained('progress_accomplishment', 'payitem_progress_id')->cascadeOnUpdate()->cascadeOnDelete();
            $table->integer('contract_part_id');
            $table->integer('pay_item_no');
            $table->double('quantity_this_period');
            $table->double('amount_this_period');
            $table->double('to_date_weight_percent');
            $table->double('balance_weight_percent');
            $table->string('remarks');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pay_item_progress_accomplishment');
    }
};
