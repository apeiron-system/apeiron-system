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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('contract_id')->references("id")->on("contract")
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('description');
            $table->enum('type', ['material', 'labor', 'equipment']);
            $table->string('unit');
            $table->decimal('unit_cost', 15, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
