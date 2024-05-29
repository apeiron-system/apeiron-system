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
        Schema::create('pay_item_job_order', function (Blueprint $table) {
            $table->id();
            $table->integer('job_order_no');
            $table->integer('job_order_part');
            $table->string('equipment_name');
            $table->timestamps();

            $table->unsignedBigInteger('pi_job_order_id');
            $table->foreign('pi_job_order_id')->references('id')->on('job_order')->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('pi_jo_part_id');
            $table->foreign('pi_jo_part_id')->references('id')->on('job_order_part')->onDelete('cascade')->onUpdate('cascade');
  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pay_item_job_order');
    }
};
