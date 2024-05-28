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
        Schema::create('pay_item', function (Blueprint $table) {
            $table->id('pay_item_id');
            $table->date('date_modified');
            $table->text('description');
            $table->text('location');
            $table->integer('unit');
            $table->decimal('unit_bid_cost');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pay_item');
    }
};
