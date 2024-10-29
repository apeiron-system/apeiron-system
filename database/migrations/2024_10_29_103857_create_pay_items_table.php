<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pay_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_contract_id')
                  ->constrained('project_contract')
                  ->onDelete('cascade');
            $table->string('item_no');
            $table->text('description');
            $table->string('unit');
            $table->decimal('qty', 10, 2);
            $table->decimal('unit_cost', 12, 2);
            $table->decimal('amount', 12, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pay_items');
    }
};