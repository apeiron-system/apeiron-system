<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_orders', function (Blueprint $table) {
            $table->id('jo_no');

            $table->foreignId('contract_id')
                  ->constrained('contract')
                  ->onDelete('cascade');

            $table->foreignId('project_id')
                  ->constrained('project')
                  ->onDelete('cascade');

            $table->string('jo_name');
            $table->string('location');
            $table->string('supplier');
            $table->enum('itemWorks', ['material', 'labor', 'equipment']);
            $table->string('period_covered');
            $table->date('dateNeeded');
            $table->string('preparedBy');
            $table->string('checkedBy');
            $table->string('approvedBy');
            $table->enum("status", ["pending", "ongoing", "canceled", "completed"])->default("pending");
            
            $table->timestamps(); // Timestamp columns: created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_orders');
    }
}
