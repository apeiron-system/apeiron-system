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
            $table->id('jo_no'); // Primary key 'jo_no'
            $table->foreignId('contract_id') // Foreign key to 'contracts' table
                  ->constrained('contracts')
                  ->onDelete('cascade');
            $table->foreignId('project_id') // Foreign key to 'projects' table
                  ->constrained('projects')
                  ->onDelete('cascade');
            $table->string('jo_name'); // Job order name
            $table->float('budget')->default(0); // Budget field with default value of 0
            $table->string('location'); // Location of the job order
            $table->string('supplier'); // Supplier for the job order
            $table->text('itemWorks'); // Item works as a string
            $table->string('period_covered'); // Period covered by the job order
            $table->date('dateNeeded'); // Date the job order is needed by
            $table->string('preparedBy'); // Prepared by (employee or department)
            $table->string('checkedBy'); // Checked by (employee or department)
            $table->string('approvedBy'); // Approved by (employee or department)
            $table->enum('status', ['completed', 'on-going'])->default('on-going'); // Status
            $table->float('progress')->default(0); // Progress field with default value of 0
            
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
