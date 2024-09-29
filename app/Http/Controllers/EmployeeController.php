<?php

namespace App\Http\Controllers;

use App\Models\EmployeeModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
