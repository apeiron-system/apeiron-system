<?php

namespace App\Http\Controllers;

use App\Models\JobOrderContractModel;
use App\Models\JobOrderProjectModel;
use App\Models\JobOrderModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobOrderController extends Controller
{
    public function index(Request $request)
    {
        try {
            $projectId = $request->query('project_id');
            if (!$projectId) {
                throw new \InvalidArgumentException('Project ID is required.');
            }

            $project = JobOrderProjectModel::with(['jobOrders' => function ($query) {
                $query->orderBy('jo_no', 'asc');
            }])->findOrFail($projectId);
            dd($project);
            $jobOrders = $project->jobOrders;

            $contractId = $jobOrders->isNotEmpty() ? $jobOrders->first()->contract_id : $project->contract_id;

            $jobOrder = $jobOrders->map(function ($jobOrder) {
                return [
                    'jo_no' => $jobOrder->jo_no,
                    'jo_name' => $jobOrder->jo_name,
                    'contract_id' => $jobOrder->contract_id,
                    'project_id' => $jobOrder->project_id,
                    'location' => $jobOrder->location,
                    'supplier' => $jobOrder->supplier,
                    'itemWorks' => $jobOrder->itemWorks,
                    'period_covered' => $jobOrder->period_covered,
                    'preparedBy' => $jobOrder->preparedBy,
                    'checkedBy' => $jobOrder->checkedBy,
                    'approvedBy' => $jobOrder->approvedBy,
                    'dateNeeded' => $jobOrder->dateNeeded ? $jobOrder->dateNeeded->format('Y-m-d') : null,
                    'status' => $jobOrder->status,
                ];
            });

            $projectName = $project->description;
            $projectLocation = $project->location;

            return Inertia::render('JobOrder/JobOrderPage', [
                'contractId' => $contractId,
                'projectId' => $projectId,
                'jobOrder' => $jobOrder,
                'projectName' => $projectName,
                'projectLocation' => $projectLocation,
            ]);

        } catch (\Exception $e) {
            Log::error('Error in JobOrderController@index: ' . $e->getMessage(), [
                'project_id' => $request->query('project_id'),
                'trace' => $e->getTraceAsString()
            ]);

            return Inertia::render('JobOrder/JobOrderPage', [
                'contractId' => null,
                'jobOrder' => [],
                'projectName' => null,
                'projectLocation' => null,
            ]);
        }
    }

    public function create(Request $request)
    {
        try {
            $projectId = $request->query('project_id');
            $project = JobOrderProjectModel::findOrFail($projectId);
            $contract = JobOrderContractModel::findOrFail($project->contract_id);

            return Inertia::render('JobOrder/CreateJobOrderPage', [
                'project' => $project,
                'contract' => $contract,
            ]);
        } catch (\Exception $e) {
            Log::error('Error in JobOrderController@create: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return Inertia::render('JobOrder/CreateJobOrderPage', [
                'project' => null,
                'contract' => null,
            ]);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'contractId' => 'required|exists:contract,id',
            'projectId' => 'required|exists:project,id',
            'jo_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'supplier' => 'required|string|max:255',
            'itemWorks' => 'required|in:material,labor,equipment',
            'period_covered' => 'required|string|max:255',
            'dateNeeded' => 'required|date',
            'preparedBy' => 'required|string|max:255',
            'checkedBy' => 'required|string|max:255',
            'approvedBy' => 'required|string|max:255',
            'status' => 'required|in:pending,ongoing,canceled,completed',
        ]);

        try {
            $jobOrderData = [
                'contract_id' => $validatedData['contractId'],
                'project_id' => $validatedData['projectId'],
                'jo_name' => $validatedData['jo_name'],
                'location' => $validatedData['location'],
                'supplier' => $validatedData['supplier'],
                'itemWorks' => $validatedData['itemWorks'],
                'period_covered' => $validatedData['period_covered'],
                'dateNeeded' => $validatedData['dateNeeded'],
                'preparedBy' => $validatedData['preparedBy'],
                'checkedBy' => $validatedData['checkedBy'],
                'approvedBy' => $validatedData['approvedBy'],
                'status' => $validatedData['status'],
            ];

            $jobOrder = JobOrderModel::create($jobOrderData);

            return response()->json([
                'success' => true,
                'message' => 'Job Order created successfully!',
                'job_order' => $jobOrder
            ]);

        } catch (\Exception $e) {
            Log::error('Error in JobOrderController@store: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create job order.'
            ], 500);
        }
    }

    public function update(Request $request, $jobOrderId)
    {
        try {
            $validated = $request->validate([
                'jo_name' => 'required|string|max:255',
                'contract_id' => 'required|exists:contract,id',
                'location' => 'required|string|max:255',
                'supplier' => 'required|string|max:255',
                'itemWorks' => 'required|in:material,labor,equipment',
                'dateNeeded' => 'required|date',
                'status' => 'required|in:pending,ongoing,canceled,completed',
            ]);

            $jobOrder = JobOrderModel::findOrFail($jobOrderId);
            $jobOrder->update($validated);

            Log::info('Job order updated successfully', [
                'job_order_id' => $jobOrderId,
                'updated_data' => $validated,
            ]);

            return redirect()->route('job_orders.index', ['project_id' => $jobOrder->project_id])
                ->with('success', 'Job order updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating job order: ' . $e->getMessage(), [
                'job_order_id' => $jobOrderId,
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()->with('error', 'An error occurred while updating the job order.');
        }
    }
}
