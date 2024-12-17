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
        //employees table should have a foreign key to users table, but is not deleted when the user is deleted

        Schema::table('employee', function (Blueprint $table) {

            $table->foreignId("user_id")->nullable();

            $table->foreign("user_id")->references("id")->on("users");
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('employee', function (Blueprint $table) {

            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

        });
    }
};
