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
        Schema::create('pay_item_job_order_progress_accomplishment', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('job_accomplishment_report_id');
            $table->foreignId('job_order_no');
            $table->foreignId('job_order_part');
            $table->foreignId('pay_item_no');
            $table->double('quantity_this_period');
            $table->double('amount_during');
            $table->double('accomplishment_to_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pay_item_job_order_progress_accomplishment');
    }
};
