<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_order_part', function (Blueprint $table) {
            $table->id();
            $table->string('part_name');
            $table->string('part_no');
            $table->integer('quantity');
            $table->string('unit');
            $table->text('description');
            $table->timestamps();

            $table->unsignedBigInteger('job_order_id');
            $table->foreign('job_order_id')
                  ->references('id')
                  ->on('job_order')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_order_part');
    }
};