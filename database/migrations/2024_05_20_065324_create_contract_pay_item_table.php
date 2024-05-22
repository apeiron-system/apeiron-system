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
        Schema::create('contract_pay_item', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date("date_modified");
            $table->integer("quantity");
            $table->decimal("unit_bid_cost");
            $table->decimal("actual_bid_cost");
            $table->decimal("initial_amount");
            $table->decimal("actual_amount");

            $table->foreignId("contract_id");
            $table->foreignId("contract_part_id");
            $table->foreignId("pay_item_no");

            $table->foreign("contract_id")->references("id")->on("project_contract");
            $table->foreign("contract_part_id")->references("id")->on("contract_part");
            $table->foreign("pay_item_no")->references("id")->on("pay_item");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_pay_item');
    }
};
