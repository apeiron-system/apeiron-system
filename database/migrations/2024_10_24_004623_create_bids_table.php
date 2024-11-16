<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('bids', function (Blueprint $table) {
            $table->id();

            $table->foreignId("contract_id");
            $table->foreign("contract_id")->references("id")->on("contract")->onDelete('cascade');

            $table->foreignId("item_id");
            $table->foreign('item_id')->references("id")->on("items")->onDelete('cascade'); // Links to items table

            $table->decimal('bid_amount', 10, 2); // Bid amount
            $table->timestamps(); // Created at & Updated at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('bids');
    }
};

