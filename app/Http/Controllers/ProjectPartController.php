<?php

namespace App\Http\Controllers;

use App\Models\ContractModel;
use App\Models\EmployeeModel;
use App\Models\ProjectModel;
use App\Models\ProjectPartModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectPartController extends Controller
{
    
    public function add($contract_id, $project_id)
    {

        $contract = ContractModel::find($contract_id);
        $project = ProjectModel::find($project_id);
        $signingAuthorityEmployee = EmployeeModel::find($project->signingAuthorityEmployee);
        $submittedByEmployee = EmployeeModel::find($project->submittedByEmployee);

        return Inertia::render('Contract/Project/ProjectPart/AddProjectPartPage', [
            'contract' => $contract,
            'project' => $project,
            'signingAuthorityEmployee' => $signingAuthorityEmployee,
            'submittedByEmployee' => $submittedByEmployee
        ]);
    }

    public function edit($contract_id, $project_id, $project_part_id)
    {

        $contract = ContractModel::find($contract_id);
        $project = ProjectModel::find($project_id);
        $projectPart = ProjectPartModel::find($project_part_id);
        $signingAuthorityEmployee = EmployeeModel::find($project->signingAuthorityEmployee);
        $submittedByEmployee = EmployeeModel::find($project->submittedByEmployee);

        return Inertia::render('Contract/Project/ProjectPart/EditProjectPartPage', [
            'contract' => $contract,
            'project' => $project,
            'projectPart' => $projectPart,
            'signingAuthorityEmployee' => $signingAuthorityEmployee,
            'submittedByEmployee' => $submittedByEmployee
        ]);
    }

    public function create(Request $request, $contract_id, $project_id)
    {


        $projectPart = new ProjectPartModel();
        $projectPart->description = $request->description;
        $projectPart->project_id = $project_id;
        $projectPart->parent_id = $request->parent_id;

        $projectPart->save();



        return redirect()->route('contract.project.view', ['contract_id' => $contract_id, 'project_id' => $project_id]);
    }

    public function update(Request $request, $contract_id, $project_id, $project_part_id)
    {

        $projectPart = ProjectPartModel::find($project_part_id);
        $projectPart->description = $request->description;
        $projectPart->parent_id = $request->parent_id;

        $projectPart->save();

        return redirect()->route('contract.project.part.view', ['contract_id' => $contract_id, 'project_id' => $project_id, "id" => $project_part_id]);
    }

    public function delete($contract_id, $project_id, $project_part_id)
    {
        $projectPart = ProjectPartModel::find($project_part_id);

        $projectPart->delete();

        return redirect()->route('contract.project.view', ['contract_id' => $contract_id, 'project_id' => $project_id]);
    }
    
}