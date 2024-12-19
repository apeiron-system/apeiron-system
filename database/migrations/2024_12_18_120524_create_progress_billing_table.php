<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgressBillingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('progress_billing', function (Blueprint $table) {
            $table->id('bill_num'); // Primary key
            $table->unsignedBigInteger('jo_no'); // Foreign key to job_orders table
            $table->unsignedBigInteger('project_id'); // Foreign key to project table
            $table->string('pb_name'); // Progress billing name
            $table->date('start_date'); // Start date of progress billing
            $table->date('end_date'); // End date of progress billing
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('jo_no')->references('jo_no')->on('job_orders')->onDelete('cascade');
            $table->foreign('project_id')->references('project_id')->on('job_orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('progress_billing');
    }
}
