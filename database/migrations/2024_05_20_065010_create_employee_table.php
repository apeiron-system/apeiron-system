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
        Schema::create('employee', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("first_name", length: 255);
            $table->string("middle_name")->nullable();
            $table->string("last_name", length: 255);

            //columns for address, in the philippines
            $table->string("street_address");
            $table->string("barangay");
            $table->string("city");
            $table->string("province");
            $table->string("zip_code");
            $table->string("country");

            //columns for contact information
            $table->string("phone_number");
            $table->string("email_address");

            //columns for employee information
            $table->string("employee_role")->default("employee");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee');
    }
};
