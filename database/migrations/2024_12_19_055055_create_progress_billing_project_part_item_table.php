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
        Schema::create('progress_billing_project_part_item', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('project_part_id');
            $table->unsignedBigInteger('item_id');
            $table->decimal('actual_cost', 15, 2)->nullable();
            $table->timestamps();

            // Foreign key constraint for project_part_id
            $table->foreign('project_part_id')
                ->references('id')
                ->on('project_part')
                ->onDelete('cascade');
            
            // Foreign key constraint
            $table->foreign('item_id')
                ->references('item_id')
                ->on('project_part_items')
                ->onDelete('cascade');
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