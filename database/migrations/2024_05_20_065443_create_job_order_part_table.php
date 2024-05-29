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
        Schema::create('job_order_part', function (Blueprint $table) {
            $table->id();
            $table->string('job_order_part');
            $table->text('description');
            $table->timestamps();

            $table->unsignedBigInteger('part_job_order_id');
            $table->foreign('part_job_order_id')->references('id')->on('job_order')->onDelete('cascade')->onUpdate('cascade');
  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_order_part');
    }
};
