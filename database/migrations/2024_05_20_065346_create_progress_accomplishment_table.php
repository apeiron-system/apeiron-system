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
        Schema::create('progress_accomplishment', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('accomplishment_date');
            $table->foreignId('contract_id');
            $table->foreignId('prepared_by_employee_id');
            $table->foreignId('approved_by_employee_id');
            $table->foreignId('reviewed_by_employee_id');
            $table->foreignId('checked_by_employee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress_accomplishment');
    }
};
