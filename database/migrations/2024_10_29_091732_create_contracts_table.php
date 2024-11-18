<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContractsTable extends Migration
{
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string('contract_name');
            $table->float('progress')->default(0); // Progress as a percentage (0-100)
            $table->enum('status', ['active', 'past'])->default('active');
            $table->float('budget')->default(0); // Budget field with default value of 0
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contracts');
    }
}

