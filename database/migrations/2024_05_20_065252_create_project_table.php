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
        Schema::create('project', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("project_name");

            //for the location
            $table->string("street_address");
            $table->string("barangay");
            $table->string("city");
            $table->string("province");
            $table->string("zip_code");
            $table->string("country");

            $table->integer("duration_in_days");
            $table->integer("num_of_units");
            $table->decimal("abc_value");

            $table->foreignId("submitted_by_employee_id");
            $table->foreign("submitted_by_employee_id")->references("id")->on("employee");

            $table->foreignId("signing_authority_employee_id");
            $table->foreign("signing_authority_employee_id")->references("id")->on("employee");

            $table->foreignId("contract_id");
            $table->foreign("contract_id")->references("id")->on("contract");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project');
    }
};
