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
            $table->unsignedBigInteger('jo_no')->nullable()->after('parent_id');
            $table->foreign('jo_no')
                ->references('jo_no')
                ->on('job_orders')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_part', function (Blueprint $table) {
            $table->dropColumn('jo_no');
            $table->dropForeign(['jo_no']);
        });
    }
};
