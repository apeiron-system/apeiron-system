<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoqPartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boq_part', function (Blueprint $table) {
            $table->id('boq_part_id'); // Primary Key
            $table->unsignedBigInteger('boq_id');
            $table->foreign('boq_id') // Foreign key to 'boq' table
                  ->references('boq_id')
                  ->on('boq')
                  ->onDelete('cascade');
            $table->string('part_name'); // Name of the BoQ part
            $table->integer('item_no'); // Item number
            $table->string('description'); // Description of the item
            $table->string('unit'); // Unit of measurement
            $table->integer('quantity'); // Quantity of the item
            $table->float('unit_cost', 10, 2); // Cost per unit
            $table->float('amount', 10, 2); // Total amount (unit_cost * quantity)
            $table->float('subtotal', 10, 2); // Subtotal for the part
            $table->float('weight', 10, 2)->nullable(); // Weight of the item, nullable
            $table->timestamps(); // Created at and Updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boq_part');
    }
}
