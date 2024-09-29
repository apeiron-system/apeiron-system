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
            $table->id();
            $table->timestamps();
            $table->date("date_modified");
            $table->string("description");
            $table->string("unit");
            $table->decimal("unit_bid_cost" , 15, 2);
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
