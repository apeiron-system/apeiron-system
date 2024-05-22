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
        Schema::create('project_contract', function (Blueprint $table) {
            $table->id();
            $table->timestamps();


            $table->string("description");
            $table->string("contract_name");
            $table->string("location");
            $table->string("designation");
            $table->date("date");
            $table->foreign("submitted_by_employee_id")->references("id")->on("employee");
            $table->foreignId("signing_authority_employee_id")->references("id")->on("employee");
            $table->foreignId("authorized_representative_employee_id")->references("id")->on("employee");
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
