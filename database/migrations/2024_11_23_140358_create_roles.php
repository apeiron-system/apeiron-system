<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Permission::create(['name' => 'contract_management']);
        Permission::create(['name' => 'job_order_management']);
        Permission::create(['name' => 'item_management']);
        Permission::create(['name' => 'employee_management']);
        Permission::create(['name' => 'progress_report_management']);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Permission::where('name', 'contract_management')->delete();
        Permission::where('name', 'job_order_management')->delete();
        Permission::where('name', 'item_management')->delete();
        Permission::where('name', 'employee_management')->delete();
        Permission::where('name', 'progress_report_management')->delete();
    }
};
