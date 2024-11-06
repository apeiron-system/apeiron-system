<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contract_id')->constrained('contracts')->onDelete('cascade'); // Foreign key to contracts
            $table->integer('item_no')->unsigned(); // Item No.
            $table->string('description'); // Description of the project item
            $table->string('unit'); // Unit of measurement, e.g., "pcs", "meters", "kg"
            $table->integer('qty')->unsigned(); // Quantity
            $table->decimal('unit_cost', 12, 2); // Cost per unit
            $table->decimal('budget', 12, 2); // Budget for the project item
            $table->float('progress')->default(0); // Progress as a percentage (0-100)
            $table->enum('status', ['completed', 'on-going'])->default('on-going'); // Status
            $table->timestamps();
            $table->softDeletes(); // Soft delete support
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
}