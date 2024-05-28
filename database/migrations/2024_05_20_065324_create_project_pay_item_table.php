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
        Schema::create('project_pay_item', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date("date_modified");
            $table->integer("quantity");
            $table->decimal("unit_bid_cost", 15, 2);
            $table->decimal("actual_bid_cost", 15, 2);
            $table->decimal("initial_amount", 15, 2);
            $table->decimal("actual_amount", 15, 2);

            $table->foreignId("project_id");
            $table->foreignId("project_part_id");
            $table->foreignId("pay_item_id");

            $table->foreign("project_id")->references("id")->on("project");
            $table->foreign("project_part_id")->references("id")->on("project_part");
            $table->foreign("pay_item_id")->references("id")->on("pay_item");
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
