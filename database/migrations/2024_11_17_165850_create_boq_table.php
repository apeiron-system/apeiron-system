<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoqTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boq', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('jo_no');
            $table->unsignedBigInteger('boq_part_id');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('jo_no')->references('jo_no')->on('job_orders')->onDelete('cascade');
            $table->foreign('boq_part_id')->references('id')->on('boq_parts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boq');
    }
}
