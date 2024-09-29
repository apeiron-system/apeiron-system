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
        Schema::create('project_part', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("description");

            $table->foreignId("project_id");
            $table->foreignId("parent_id")->nullable();

            $table->foreign("project_id")->references("id")->on("project");
            $table->foreign("parent_id")->references("id")->on("project_part");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_part');
    }
};
