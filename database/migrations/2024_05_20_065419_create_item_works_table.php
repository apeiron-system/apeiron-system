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
        Schema::create('item_works', function (Blueprint $table) {
            $table->id('item_work_id');
            $table->text('item_works');
            $table->timestamps();

            $table->unsignedBigInteger('iw_job_order_id');
            $table->foreign('iw_job_order_id')->references('job_order_id')->on('job_order')->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('iw_contract_id');
            $table->foreign('iw_contract_id')->references('contract_id')->on('contract')->onDelete('cascade')->onUpdate('cascade');
       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_works');
    }
};
