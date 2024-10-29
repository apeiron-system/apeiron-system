<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_contract_id') // Foreign key for ProjectContract
                ->constrained() // Automatically references the id on the project_contracts table
                ->onDelete('cascade'); // If the related ProjectContract is deleted, delete related Projects
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('budget', 15, 2)->nullable();
            $table->float('progress')->default(0); // Progress as a float
            $table->string('status')->default('pending'); // Default status
            $table->timestamps(); // Created_at and updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
