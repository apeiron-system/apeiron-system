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
        Schema::create('equipment_needed', function (Blueprint $table) {
            $table->id();
            $table->string('equipment_name');
            $table->timestamps();

            $table->unsignedBigInteger('en_job_order_id');
            $table->foreign('en_job_order_id')->references('id')->on('job_order')->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('en_contract_id');
            $table->foreign('en_contract_id')->references('id')->on('project_contract')->onDelete('cascade')->onUpdate('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_needed');
    }
};
