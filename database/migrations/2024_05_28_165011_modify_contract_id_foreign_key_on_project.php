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
        Schema::table('project', function (Blueprint $table) {
            // Drop the existing foreign key constraint
            // $table->dropForeign(['contract_id']);

            // Add the new foreign key constraint with onDelete('cascade')
            $table->foreign('contract_id')
                  ->references('id')
                  ->on('contract')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('project', function (Blueprint $table) {
        //     // Drop the foreign key with cascade delete
        //     $table->dropForeign(['contract_id']);

        //     // Revert back to the original foreign key without cascade delete
        //     $table->foreign('contract_id')
        //           ->references('id')
        //           ->on('contract');
        // });
    }
};
