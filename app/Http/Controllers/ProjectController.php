<?php

namespace App\Http\Controllers;

use App\Models\ContractModel;
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

        $contract = ContractModel::find($id);

        $signingAuthorityEmployee = EmployeeModel::find($contract->authorized_representative_employee_id);


        return Inertia::render('Contract/Project/AddProjectPage', [
            "contract" => $contract, "employees" => $employees,
            "signingAuthorityEmployee" => $signingAuthorityEmployee
        ]);
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

        return redirect()->route('contract.view', $contract_id);
    }

    public function view($contract_id, $project_id)
    {

        $project = ProjectModel::find($project_id);

        $contract = ContractModel::find($contract_id);

        $signingAuthorityEmployee = EmployeeModel::find($project->signing_authority_employee_id);

        $submittedByEmployee = EmployeeModel::find($project->submitted_by_employee_id);

        $projectParts = $project->projectParts;

        return Inertia::render('Contract/Project/ViewProjectPage', [
            "project" => $project, "contract" => $contract,
            "signingAuthorityEmployee" => $signingAuthorityEmployee,
            "submittedByEmployee" => $submittedByEmployee,
            "projectParts" => $projectParts

        ]);
    }

    public function edit($contract_id, $project_id)
    {

        $project = ProjectModel::find($project_id);

        $employees = EmployeeModel::all();

        $contract = ContractModel::find($contract_id);

        $signingAuthorityEmployee = EmployeeModel::find($project->signing_authority_employee_id);

        $submittedByEmployee = EmployeeModel::find($project->submitted_by_employee_id);

        return Inertia::render('Contract/Project/EditProjectPage', [
            "project" => $project, "employees" => $employees, "contract" => $contract,
            "signingAuthorityEmployee" => $signingAuthorityEmployee,
            "submittedByEmployee" => $submittedByEmployee
        ]);
    }

    public function update(Request $request, $contract_id, $project_id)
    {

        $project = ProjectModel::find($project_id);

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

        return redirect()->route('contract.project.view', [$contract_id, $project_id]);
    }

    public function delete($contract_id, $project_id)
    {

        $project = ProjectModel::find($project_id);

        $project->delete();

        return redirect()->route('contract.view', $contract_id);
    }
}
