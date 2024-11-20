<?php

namespace App\Http\Controllers;

use App\Models\ContractModel;
use App\Models\EmployeeModel;
use App\Models\ProgressAccomplishmentModel;
use App\Models\ProjectModel;
use App\Services\ItemService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgressReportController extends Controller
{
    protected $itemService;

    public function __construct(ItemService $itemService)
    {
        $this->itemService = $itemService;
    }

    // Display all contract cards, no items
    public function index_contracts()
    {
        $contracts = $this->itemService->getContracts();

        // Add status and dotColor to each contract
        $contracts = $contracts->map(function ($contract) {
            $contract['dotColor'] = $this->getDotColor($contract['status']); // Map status to dotColor
            return $contract;
        });

        return Inertia::render('ProgressReport/ProgressReportPage', ['contracts' => $contracts]);
    }

    private function getDotColor($status)
    {
        return match ($status) {
            'pending' => 'yellow',
            'ongoing' => 'green',
            'canceled' => 'red',
            'completed' => 'gray',
            default => 'gray',
        };
    }

    public function showContract(Request $request, $contractId)
    {
        $contract = ContractModel::findOrFail($contractId);

        $projectsQuery = ProjectModel::where('contract_id', $contractId);

        $projects = $projectsQuery->get();

        return Inertia::render('ProgressReport/ParDetailsPage', [
            'contract' => $contract,
            'projects' => $projects,
        ]);
    }

    public function showProject($contractId, $projectId)
    {
        $project = ProjectModel::findOrFail($projectId);

        $employees = EmployeeModel::all();

        return Inertia::render('ProgressReport/ParDetailsPage/ProjectPARPage', [
            'project' => $project,
            'contract' => $project->contract,
            'employees' => $employees,
        ]);
    }

    public function index_par($contractId, $projectId)
    {
        // Fetch progress accomplishment reports related to the given project
        $progressReports = ProgressAccomplishmentModel::where('contract_id', $contractId)
        ->where('project_id', $projectId)
        ->get();

        // Return progress reports as JSON
        return response()->json($progressReports, 200);
    }
    

    public function store(Request $request, $contractId, $projectId)
    {
        $validated = $request->validate([
            'accomplishment_date' => 'required|date',
            'checkedBy' => 'required|integer',
            'reviewedBy' => 'required|integer',
            'approvedBy' => 'required|integer',
            'preparedBy' => 'required|integer',
        ]);
    
        $progressreport = ProgressAccomplishmentModel::create([
            'accomplishment_date' => $validated['accomplishment_date'],
            'checked_by_employee_id' => $validated['checkedBy'],
            'reviewed_by_employee_id' => $validated['reviewedBy'],
            'approved_by_employee_id' => $validated['approvedBy'],
            'prepared_by_employee_id' => $validated['preparedBy'],
            'contract_id' => $contractId,
            'project_id' => $projectId,
        ]);
    
        return ;
    }

}
