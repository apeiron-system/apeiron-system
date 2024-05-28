<?php

namespace App\Http\Controllers;

use App\Models\EmployeeModel;
use App\Models\ProjectModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    //

    public function add($id)
    {

        $employees = EmployeeModel::all();

        return Inertia::render('Contract/Project/AddProjectPage', ["id" => $id, "employees" => $employees]);
    }

    public function create(Request $request, $contract_id)
    {

        $project = new ProjectModel();

        $project->project_name = $request->project_name;
        $project->status = $request->status;
        $project->street_address = $request->street_address;
        $project->barangay = $request->barangay;
        $project->city = $request->city;
        $project->province = $request->province;
        $project->zip_code = $request->zip_code;
        $project->country = $request->country;
        $project->duration_in_days = $request->duration_in_days;
        $project->num_of_units = $request->num_of_units;
        $project->abc_value = $request->abc_value;
        $project->submitted_by_employee_id = $request->submitted_by_employee_id;
        $project->signing_authority_employee_id = $request->signing_authority_employee_id;
        $project->contract_id = $contract_id;

        $project->save();

        return redirect()->route('contract');
    }
}
