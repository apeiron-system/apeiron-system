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
        Schema::create('item_prices', function (Blueprint $table) {

            $table->id();
            $table->timestamps();
            $table->foreignId('item_id')->references("id")->on("items")
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->integer('version');
            $table->decimal('unit_cost', 15, 2);
            $table->boolean('is_current');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_prices');
    }
};
