<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeeSeeder extends Seeder
{
    public function run()
    {
        DB::table('employee')->insert([
            [
                'first_name' => 'Gianne',
                'middle_name' => 'P.',
                'last_name' => 'Bacay',
                'street_address' => '123 Main St',
                'barangay' => 'Barangay 1',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8000',
                'country' => 'Philippines',
                'phone_number' => '09123456789',
                'email_address' => 'gianne@example.com',
                'employee_role' => 'Developer',
            ],
            [
                'first_name' => 'Alex',
                'middle_name' => 'T.',
                'last_name' => 'Villasis',
                'street_address' => '456 Side St',
                'barangay' => 'Barangay 2',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8001',
                'country' => 'Philippines',
                'phone_number' => '09123456780',
                'email_address' => 'alex@example.com',
                'employee_role' => 'Manager',
            ],
            [
                'first_name' => 'John',
                'middle_name' => 'R.',
                'last_name' => 'Aldeza',
                'street_address' => '789 Corner Rd',
                'barangay' => 'Barangay 3',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8002',
                'country' => 'Philippines',
                'phone_number' => '09123456781',
                'email_address' => 'john@example.com',
                'employee_role' => 'Director',
            ],
            [
                'first_name' => 'Maria',
                'middle_name' => 'S.',
                'last_name' => 'Santos',
                'street_address' => '101 East St',
                'barangay' => 'Barangay 4',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8003',
                'country' => 'Philippines',
                'phone_number' => '09123456782',
                'email_address' => 'maria@example.com',
                'employee_role' => 'Supervisor',
            ],
            [
                'first_name' => 'Pedro',
                'middle_name' => 'M.',
                'last_name' => 'Cruz',
                'street_address' => '202 West St',
                'barangay' => 'Barangay 5',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8004',
                'country' => 'Philippines',
                'phone_number' => '09123456783',
                'email_address' => 'pedro@example.com',
                'employee_role' => 'Team Lead',
            ],
        ]);
    }
}