<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pb_item_actual_cost', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('item_id'); // Foreign key column
            $table->decimal('actual_cost', 15, 2)->nullable(); // Actual cost column
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('item_id')
                  ->references('item_id')
                  ->on('project_part_items')
                  ->onDelete('cascade'); // Ensures referential integrity
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pb_item_actual_cost');
    }
};