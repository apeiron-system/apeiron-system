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
            // description
            // contractName
            // location
            // designation
            // date
            // submittedByEmployeeID (FK)
            // signingAuthorityEmployeeID (FK)
            // authorizedRepresentativeEmployeeID (FK)

            $table->string("description");
            $table->string("contract_name");


            //columns for address, in the philippines
            $table->string("location");
            $table->string("designation");
            $table->date("date");
            $table->foreignId("submitted_by_employee_id");
            $table->foreignId("signing_authority_employee_id");
            $table->foreignId("authorized_representative_employee_id");
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
