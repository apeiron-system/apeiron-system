<?php

namespace App\Http\Controllers;

use App\Models\ContractModel;
use App\Models\EmployeeModel;
use App\Models\ProjectModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContractController extends Controller
{
    //


    public function view(Request $request)
    {
        $search = $request->input('search');
    
        // Active contracts (exclude completed and canceled)
        $contracts = ContractModel::whereNotIn('status', ['completed', 'canceled'])->get();
    
        // Filter past contracts with status "completed"
        $pastContractsQuery = ContractModel::where('status', 'completed');
    
        // Apply search filter if provided
        if ($search) {
            $pastContractsQuery->where('contract_name', 'like', '%' . $search . '%');
        }
    
        $pastContracts = $pastContractsQuery->get();
    
        return Inertia::render('Contract/ContractPage', [
            'contracts' => $contracts,
            'pastContracts' => $pastContracts, // Use the correct data label
        ]);
    }
    

    public function add()
    {

        $employees = EmployeeModel::all();



        return Inertia::render('Contract/AddContractPage', ['employees' => $employees]);
    }

    public function create(Request $request)
    {

        $request->validate([
            'contract_name' => 'required',
            'location' => 'required',
            'designation' => 'required',
            'duration_in_days' => 'required',
            'amount' => 'required',
            'date' => 'required',
            'authorized_representative_employee_id' => 'required',
        ]);

        $contract = new ContractModel();

        $contract->contract_name = $request->contract_name;
        $contract->status = $request->status;
        $contract->location = $request->location;
        $contract->description = $request->description;
        $contract->designation = $request->designation;
        $contract->duration_in_days = $request->duration_in_days;
        $contract->amount = $request->amount;
        $contract->date = $request->date;
        $contract->authorized_representative_employee_id = $request->authorized_representative_employee_id;
        $contract->submitted_by_employee_id = 1;
        $contract->signing_authority_employee_id = 1;
        $contract->save();


        return redirect()->route('contract');
    }

    public function viewContract(Request $request, $id)
    {
        $contract = ContractModel::with('projects')->find($id);
        
        if (!$contract) {
            return redirect()->route('contracts.index')->with('error', 'Contract not found.');
        }
    
        $signingAuthorityEmployee = EmployeeModel::find($contract->authorized_representative_employee_id);
    
        // Build the query for projects
        $projectsQuery = ProjectModel::where('contract_id', $id);
    
        // Apply search filter if search query exists
        if ($request->has('search') && !empty($request->search)) {
            $projectsQuery->where('project_name', 'like', '%' . $request->search . '%');
        }
    
        $projects = $projectsQuery->get();
    
        return Inertia::render('Contract/ViewContractPage', [
            'contract' => $contract,
            'projects' => $projects,
            'signingAuthorityEmployee' => $signingAuthorityEmployee,
        ]);
    }

    public function edit($id)
    {

        $contract = ContractModel::find($id);
        $employees = EmployeeModel::all();

        return Inertia::render('Contract/EditContractPage', ['contract' => $contract, 'employees' => $employees]);
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'contract_name' => 'required',
            'location' => 'required',
            'designation' => 'required',
            'duration_in_days' => 'required',
            'amount' => 'required',
            'date' => 'required',
            'authorized_representative_employee_id' => 'required',
        ]);

        $contract = ContractModel::find($id);

        $contract->contract_name = $request->contract_name;
        $contract->status = $request->status;
        $contract->location = $request->location;
        $contract->description = $request->description;
        $contract->designation = $request->designation;
        $contract->duration_in_days = $request->duration_in_days;
        $contract->amount = $request->amount;
        $contract->date = $request->date;
        $contract->authorized_representative_employee_id = $request->authorized_representative_employee_id;

        $contract->save();

        return redirect()->route('contract.view', ['id' => $contract->id]);
    }

    public function delete($id)
    {

        $contract = ContractModel::find($id);

        $contract->delete();

        return redirect()->route('contract');
    }
}
