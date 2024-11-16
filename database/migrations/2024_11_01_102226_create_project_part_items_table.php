<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('project_part_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId("contract_id");
            $table->foreign("contract_id")->references("id")->on("contract")->onDelete('cascade');

            $table->foreignId("project_part_id");
            $table->foreign('project_part_id')->references("id")->on("project_part")->onDelete('cascade');

            $table->foreignId("item_id");
            $table->foreign('item_id')->references("id")->on("items")->onDelete('cascade');

            $table->integer('quantity');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('project_part_items');
    }
};

