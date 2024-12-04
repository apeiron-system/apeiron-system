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
            $table->id('boq_part_id');
            
            $table->unsignedBigInteger('boq_id');
            $table->foreign('boq_id')
                  ->references('boq_id')
                  ->on('boq')
                  ->onDelete('cascade');
            $table->string('part_name');
            $table->integer('item_no');
            $table->string('description');
            $table->string('unit');
            $table->integer('quantity');
            $table->float('unit_cost', 10, 2);
            $table->float('amount', 10, 2);
            $table->float('subtotal', 10, 2);
            $table->float('weight', 10, 2)->nullable();

            $table->timestamps();
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
