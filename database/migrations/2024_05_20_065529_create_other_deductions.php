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
        Schema::create('other_deductions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('job_accomplishment_report_id')
                ->constrained('job_order_progress_accomplishment', 'jo_pa_item_id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string('cv_number');
            $table->date('date');
            $table->string('particulars');
            $table->double('released');
            $table->double('deductions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('other_deductions');
    }
};
