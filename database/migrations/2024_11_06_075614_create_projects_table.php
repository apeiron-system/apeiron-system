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
            $table->foreignId('contract_id')->constrained('contracts')->onDelete('cascade'); // Foreign key to contracts table
            $table->string('description'); // Description of the project item
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
