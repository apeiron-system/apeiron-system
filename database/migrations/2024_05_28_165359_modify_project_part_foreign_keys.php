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
        Schema::table('project_part', function (Blueprint $table) {
            // Drop the existing foreign key constraints
            $table->dropForeign(['project_id']);
            $table->dropForeign(['parent_id']);

            // Add the new foreign key constraints with onDelete('cascade')
            $table->foreign('project_id')
                  ->references('id')
                  ->on('project')
                  ->onDelete('cascade');

            $table->foreign('parent_id')
                  ->references('id')
                  ->on('project_part')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_part', function (Blueprint $table) {
            // Drop the foreign keys with cascade delete
            $table->dropForeign(['project_id']);
            $table->dropForeign(['parent_id']);

            // Revert back to the original foreign keys without cascade delete
            $table->foreign('project_id')
                  ->references('id')
                  ->on('project');

            $table->foreign('parent_id')
                  ->references('id')
                  ->on('project_part');
        });
    }
};
