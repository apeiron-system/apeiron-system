<?php

namespace App\Http\Controllers;

use App\Models\ContractModel;
use App\Models\EmployeeModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContractController extends Controller
{
    //


    public function view()
    {

        // get all contracts from the ContractModel

        $contracts = ContractModel::all();

        return Inertia::render('Contract/ContractPage', ['contracts' => $contracts]);
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

        $contract->save();


        return redirect()->route('contract');
    }
}