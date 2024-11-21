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
        Schema::create('job_order_progress_accomplishment', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('job_order_no');
            $table->integer('checked_by_employee_id');
            $table->integer('reviewed_by_employee_id');
            $table->integer('recommend_approval_employee_id');
            $table->integer('approved_by_employee_id');
            $table->integer('bill_no');
            $table->date('date');
            $table->string('type');
            $table->string('period_covered');
            $table->string('progress_billing');
            $table->double('total_partial_payments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_order_progress_accomplishment');
    }
};
