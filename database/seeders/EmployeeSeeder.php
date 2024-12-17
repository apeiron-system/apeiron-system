<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('employee')->insert([
            [
                'first_name' => 'John',
                'middle_name' => 'Michael',
                'last_name' => 'Doe',
                'street_address' => '123 Main St',
                'barangay' => 'Barangay 1',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'zip_code' => '8000',
                'country' => 'Philippines',
                'phone_number' => '09171234567',
                'email_address' => 'john.doe@example.com',
                'employee_role' => 'Engineer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Jane',
                'middle_name' => null,
                'last_name' => 'Smith',
                'street_address' => '456 Elm St',
                'barangay' => 'Barangay 2',
                'city' => 'Tagum City',
                'province' => 'Davao del Norte',
                'zip_code' => '8100',
                'country' => 'Philippines',
                'phone_number' => '09181234567',
                'email_address' => 'jane.smith@example.com',
                'employee_role' => 'Manager',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Alan',
                'middle_name' => 'Walker',
                'last_name' => 'Brown',
                'street_address' => '789 Pine St',
                'barangay' => 'Barangay 3',
                'city' => 'Panabo City',
                'province' => 'Davao del Norte',
                'zip_code' => '8110',
                'country' => 'Philippines',
                'phone_number' => '09192234567',
                'email_address' => 'alan.brown@example.com',
                'employee_role' => 'Supervisor',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Sara',
                'middle_name' => 'Ann',
                'last_name' => 'Connor',
                'street_address' => '321 Oak St',
                'barangay' => 'Barangay 4',
                'city' => 'Mati City',
                'province' => 'Davao Oriental',
                'zip_code' => '8200',
                'country' => 'Philippines',
                'phone_number' => '09193234567',
                'email_address' => 'sara.connor@example.com',
                'employee_role' => 'Architect',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Peter',
                'middle_name' => 'Parker',
                'last_name' => 'Johnson',
                'street_address' => '654 Cedar St',
                'barangay' => 'Barangay 5',
                'city' => 'Samal Island',
                'province' => 'Davao del Norte',
                'zip_code' => '8119',
                'country' => 'Philippines',
                'phone_number' => '09201234567',
                'email_address' => 'peter.johnson@example.com',
                'employee_role' => 'Technician',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Bruce',
                'middle_name' => 'Thomas',
                'last_name' => 'Wayne',
                'street_address' => '987 Maple St',
                'barangay' => 'Barangay 6',
                'city' => 'Digos City',
                'province' => 'Davao del Sur',
                'zip_code' => '8002',
                'country' => 'Philippines',
                'phone_number' => '09212234567',
                'email_address' => 'bruce.wayne@example.com',
                'employee_role' => 'Foreman',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Clark',
                'middle_name' => 'Joseph',
                'last_name' => 'Kent',
                'street_address' => '111 Birch St',
                'barangay' => 'Barangay 7',
                'city' => 'Compostela Valley',
                'province' => 'Davao de Oro',
                'zip_code' => '8118',
                'country' => 'Philippines',
                'phone_number' => '09222234567',
                'email_address' => 'clark.kent@example.com',
                'employee_role' => 'Inspector',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Diana',
                'middle_name' => 'Frances',
                'last_name' => 'Prince',
                'street_address' => '222 Palm St',
                'barangay' => 'Barangay 8',
                'city' => 'Marilog District',
                'province' => 'Davao City',
                'zip_code' => '8000',
                'country' => 'Philippines',
                'phone_number' => '09232234567',
                'email_address' => 'diana.prince@example.com',
                'employee_role' => 'Project Lead',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Barry',
                'middle_name' => 'Allen',
                'last_name' => 'West',
                'street_address' => '333 Willow St',
                'barangay' => 'Barangay 9',
                'city' => 'Davao del Sur',
                'province' => 'Davao del Sur',
                'zip_code' => '8003',
                'country' => 'Philippines',
                'phone_number' => '09242234567',
                'email_address' => 'barry.west@example.com',
                'employee_role' => 'Consultant',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Arthur',
                'middle_name' => 'Curry',
                'last_name' => 'Jones',
                'street_address' => '444 Chestnut St',
                'barangay' => 'Barangay 10',
                'city' => 'Davao del Norte',
                'province' => 'Davao del Norte',
                'zip_code' => '8110',
                'country' => 'Philippines',
                'phone_number' => '09252234567',
                'email_address' => 'arthur.jones@example.com',
                'employee_role' => 'Surveyor',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
