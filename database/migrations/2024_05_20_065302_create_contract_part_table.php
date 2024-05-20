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
        Schema::create('contract_part', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("contract_id");
            $table->string("description");
            $table->foreignId("contract_parent_id");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_part');
    }
};
