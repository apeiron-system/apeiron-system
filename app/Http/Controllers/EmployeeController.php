<?php

namespace App\Http\Controllers;

use App\Enums\PermissionsEnum;
use App\Models\EmployeeModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Contracts\Role;
use Spatie\Permission\Models\Role as ModelsRole;

class EmployeeController extends Controller
{

    public function create(Request $request)
    {
        //get employee details from request

        $employee = new EmployeeModel();
        $employee->first_name = $request->first_name;
        $employee->middle_name = $request->middle_name;
        $employee->last_name = $request->last_name;
        $employee->street_address = $request->street_address;
        $employee->barangay = $request->barangay;
        $employee->city = $request->city;
        $employee->province = $request->province;
        $employee->zip_code = $request->zip_code;
        $employee->country = $request->country;
        $employee->phone_number = $request->phone_number;
        $employee->email_address = $request->email_address;
        $employee->employee_role = $request->employee_role;

        //save employee to database

        $employee->save();


        //redirect to get employees
        return redirect()->route('employees');
    }

    public function view(Request $request)
    {
        $employees = EmployeeModel::all();
        return Inertia::render('Employee/EmployeePage', ['employees' => $employees]);
    }

    public function edit($id)
    {
        $employee = EmployeeModel::find($id);
        return Inertia::render('Employee/EditEmployeePage', ['employee' => $employee]);
    }

    public function update(Request $request, $id)
    {
        $employee = EmployeeModel::find($id);
        $employee->first_name = $request->first_name;
        $employee->middle_name = $request->middle_name;
        $employee->last_name = $request->last_name;
        $employee->street_address = $request->street_address;
        $employee->barangay = $request->barangay;
        $employee->city = $request->city;
        $employee->province = $request->province;
        $employee->zip_code = $request->zip_code;
        $employee->country = $request->country;
        $employee->phone_number = $request->phone_number;
        $employee->email_address = $request->email_address;
        $employee->employee_role = $request->employee_role;

        $employee->save();

        return redirect()->route('employees');
    }

    public function delete(Request $request)
    {
        $employee = EmployeeModel::find($request->id);
        $employee->delete();

        return redirect()->route('employees');
    }

    public function userManagement(Request $request, $id)
    {
        //get the current employee details

        $employee = EmployeeModel::find($id);


        $user = User::find($employee->user_id);

        //get the user roles
        $permissions = null;
        if ($user) {
            $permissions = $user->permissions->pluck("name");
        }

        //get the user details
        return Inertia::render('Employee/UserManagement/Show', [
            "employee" => $employee,
            "user" => $user,
            "permissions" => $permissions

        ]);
    }
    public function updateUserManagement(Request $request, $id)
    {
        $employee = EmployeeModel::find($id);

        // If system access is not enabled, remove user association
        if (!$request->systemAccess) {
            $user = User::find($employee->user_id);
            if ($user) {
                Log::info("shit");
                $user->delete();
            }

            $employee->user_id = null;
            $employee->save();

            return redirect()->route('employees');
        }

        // Create or update the user if system access is enabled
        $user = User::find($employee->user_id);
        if (!$user) {
            $user = new User();
            $user->name = $employee->first_name . " " . $employee->last_name;
            $user->email = $employee->email_address;
            $user->password = Hash::make($request->password);
            $user->save(); // Update employee with the new user ID
            $employee->user_id = $user->id;
            $employee->save();
        } else {

            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }
        }



        // Process and save permissions using Spatie
        $permissions = $request->permissions;

        // Clear all existing permissions first
        $user->syncPermissions([]);

        if (in_array(PermissionsEnum::CONTRACT_MANAGEMENT->value, $permissions)) {
            $user->givePermissionTo(PermissionsEnum::CONTRACT_MANAGEMENT->value);
        }

        if (in_array(PermissionsEnum::EMPLOYEE_MANAGEMENT->value, $permissions)) {
            $user->givePermissionTo(PermissionsEnum::EMPLOYEE_MANAGEMENT->value);
        }

        if (in_array(PermissionsEnum::JOB_ORDER_MANAGEMENT->value, $permissions)) {
            $user->givePermissionTo(PermissionsEnum::JOB_ORDER_MANAGEMENT->value);
        }

        if (in_array(PermissionsEnum::ITEM_MANAGEMENT->value, $permissions)) {
            $user->givePermissionTo(PermissionsEnum::ITEM_MANAGEMENT->value);
        }

        if (in_array(PermissionsEnum::PROGRESS_REPORT_MANAGEMENT->value, $permissions)) {
            $user->givePermissionTo(PermissionsEnum::PROGRESS_REPORT_MANAGEMENT->value);
        }

        return $this->userManagement($request, $id);
    }
}
