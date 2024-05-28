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
        Schema::create('job_order', function (Blueprint $table) {
            $table->id('job_order_id');
            $table->string('job_order_no');
            $table->text('location');
            $table->string('period_covered');
            $table->string('supplier');
            $table->date('date_needed');
            $table->string('prepared_by');
            $table->string('checked_by');
            $table->string('approved_by');
            $table->string('piece_work_subcontractor');
            $table->decimal('grand_total');
            $table->timestamp('failed_at')->useCurrent();

            $table->unsignedBigInteger('jo_contract_id');
            $table->foreign('jo_contract_id')->references('contract_id')->on('contract')->onDelete('cascade')->onUpdate('cascade');
       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_order');
    }
};
