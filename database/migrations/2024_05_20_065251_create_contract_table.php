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
        Schema::create('contract', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("description");
            $table->string("contract_name");
            $table->string("location");
            $table->string("designation");
            $table->decimal("amount");
            $table->date("date");

            $table->foreignId("authorized_representative_employee_id");
            $table->foreign("authorized_representative_employee_id")->references("id")->on("employee");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_contract');
    }
};
