<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\ContractModel;
use App\Models\EmployeeModel;
use App\Models\PayItemProgressAccomplishmentModel;
use App\Models\ProgressAccomplishmentModel;
use App\Models\ProjectModel;
use App\Services\ItemService;
use DB;
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

        return;
    }

    public function showProgressReport($contractId, $projectId, $reportId)
    {
        // Retrieve the progress report
        $progressReport = ProgressAccomplishmentModel::findOrFail($reportId);

        // Retrieve all items under the same contract and project, disregarding the parts
        $items = DB::table('project_part_items')
            ->join('project_part', 'project_part_items.project_part_id', '=', 'project_part.id')
            ->join('items', 'project_part_items.item_id', '=', 'items.id') // Assuming `items` is your items table
            ->where('project_part_items.contract_id', $contractId)
            ->where('project_part.project_id', $projectId)
            ->select('items.*', 'project_part_items.quantity')
            ->get();

        $bids = Bid::where('contract_id', $contractId)->get();

        return Inertia::render('ProgressReport/ParDetailsPage/ParContractDetailsPage', [
            'progressReport' => $progressReport,
            'contract' => $progressReport->project->contract,
            'project' => $progressReport->project,
            'employees' => EmployeeModel::all(),
            'items' => $items, // Pass the retrieved items
            'bids' => $bids,
        ]);
    }

    public function storeProgressReportItem(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'accomplishment_report_id' => 'required',
            'contract_part_id' => 'required',
            'pay_item_no' => 'required',
            'quantity_this_period' => 'required|numeric|min:0',
            'amount_this_period' => 'required|numeric|min:0',
            'to_date_weight_percent' => 'required|numeric|min:0|max:100',
            'balance_weight_percent' => 'required|numeric|min:0|max:100',
            'remarks' => 'nullable|string|max:255',
        ]);

        // Check if the entry already exists
        $payItemProgress = PayItemProgressAccomplishmentModel::where('accomplishment_report_id', $validated['accomplishment_report_id'])
            ->where('pay_item_no', $validated['pay_item_no'])
            ->first();

        if ($payItemProgress) {
            // Update existing record
            $payItemProgress->update($validated);
        } else {
            // Create new record
            PayItemProgressAccomplishmentModel::create($validated);
        }

        return;
    }

    public function getAccomplishments($contractId, $projectId, $reportId)
    {
        $accomplishments = PayItemProgressAccomplishmentModel::where('accomplishment_report_id', $reportId)->get();

        return response()->json($accomplishments);
    }

}
