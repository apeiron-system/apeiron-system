<?php

namespace App\Http\Controllers;

use App\Models\JobOrderContractModel;
use App\Models\JobOrderProjectModel;
use App\Models\ProjectPartModel;
use App\Models\JobOrderModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobOrderController extends Controller
{
    public function index(Request $request)
    {
            // Get project ID from the request (URL parameters)
            $projectId = $request->query('project_id');

            // Validate the presence of project_id
            if (!$projectId) {
                throw new \InvalidArgumentException('Project ID is required.');
            }

            // Fetch the project and its associated job orders
            $project = JobOrderProjectModel::with(['jobOrders' => function ($query) {
                $query->orderBy('jo_no', 'asc'); // Sort job orders by jo_no
            }])->findOrFail($projectId);

            // Ensure there are job orders
            $jobOrders = $project->jobOrders;
            
            // If there are job orders, get the contract_id from the first job order
            $contractId = $jobOrders->isNotEmpty() ? $jobOrders->first()->contract_id : $project->contract_id;

            // Map the job orders to match the frontend's required structure
            $jobOrder = $jobOrders->map(function ($jobOrder) {
                return [
                    'jo_no' => $jobOrder->jo_no,
                    'jo_name' => $jobOrder->jo_name,
                    'contract_id' => $jobOrder->contract_id,
                    'project_id' => $jobOrder->project_id,
                    'location' => $jobOrder->location,
                    'supplier' => $jobOrder->supplier,
                    'period_covered' => $jobOrder->period_covered,
                    'preparedBy' => $jobOrder->preparedBy,
                    'checkedBy' => $jobOrder->checkedBy,
                    'approvedBy' => $jobOrder->approvedBy,
                    'itemWorks' => $jobOrder->itemWorks,
                    'dateNeeded' => $jobOrder->dateNeeded ? $jobOrder->dateNeeded->format('Y-m-d') : null,
                    'status' => $jobOrder->status,
                ];
            });

            // Extract project name and location from the project
            $projectName = $project->project_name;
            $projectLocation = trim(
                $project->street_address . ', ' . 
                $project->barangay . ', ' . 
                $project->city
            );

            return Inertia::render('JobOrder/JobOrderPage', [
                'contractId' => $contractId, // Pass contract_id of the first job order
                'projectId' => $projectId,
                'jobOrder' => $jobOrder,
                'projectName' => $projectName, // Pass the project name to the frontend
                'projectLocation' => $projectLocation, // Pass the project location to the frontend
            ]);

    }

    /**
     * Show the form for creating a new job order.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        try {
            // Fetch project data to pass to the frontend
            $projectId = $request->query('project_id');
            $project = JobOrderProjectModel::findOrFail($projectId);

            // Fetch contract data, assuming the project has a contract
            $contract = JobOrderContractModel::findOrFail($project->contract_id);

            // Fetch project parts by project ID, only selecting 'id' and 'description'
            $projectParts = ProjectPartModel::where('project_id', $projectId)
                ->whereNull('parent_id') // Only top-level parts
                ->get(['id', 'description']);

            // Pass data to Inertia view
            return Inertia::render('JobOrder/CreateJobOrderPage', [
                'project' => $project,
                'contract' => $contract,
                'projectParts' => $projectParts,  // Add the project parts
            ]);
        } catch (\Exception $e) {
            Log::error('Error in JobOrderController@create: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            // In case of error, return empty data for project and contract
            return Inertia::render('JobOrder/CreateJobOrderPage', [
                'project' => null,
                'contract' => null,
                'projectParts' => [],  // Add empty array for project parts in case of error
            ]);
        }
    }

    /**
     * Store a newly created job order in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'contractId' => 'required|exists:contract,id',
            'projectId' => 'required|exists:project,id',
            'jobOrderName' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'supplier' => 'required|string|max:255',
            'itemWorks' => 'required|string|max:255',
            'periodCovered' => 'required|string|max:255',
            'dateNeeded' => 'required|date',
            'preparedBy' => 'required|string|max:255',
            'checkedBy' => 'required|string|max:255',
            'approvedBy' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        try {
            // Transform the validated data to match database column names
            $jobOrderData = [
                'contract_id' => $validatedData['contractId'],
                'project_id' => $validatedData['projectId'],
                'jo_name' => $validatedData['jobOrderName'],
                'location' => $validatedData['location'],
                'supplier' => $validatedData['supplier'],
                'itemWorks' => $validatedData['itemWorks'],
                'period_covered' => $validatedData['periodCovered'],
                'dateNeeded' => $validatedData['dateNeeded'],
                'preparedBy' => $validatedData['preparedBy'],
                'checkedBy' => $validatedData['checkedBy'],
                'approvedBy' => $validatedData['approvedBy'],
                'status' =>  $validatedData['status'],
            ];

            // Create the job order
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
            // Validate the incoming request data
            $validated = $request->validate([
                'jo_name' => 'required|string|max:255',
                'contract_id' => 'required|exists:contract,id',
                'location' => 'required|string|max:255',
                'supplier' => 'required|string|max:255',
                'itemWorks' => 'required|string|max:255',
                'dateNeeded' => 'required|date',
                'status' => 'required|string|max:255',
            ]);

            // Find the job order by its ID
            $jobOrder = JobOrderModel::findOrFail($jobOrderId);

            // Update the job order with validated data
            $jobOrder->update($validated);

            // Optionally, log the successful update
            Log::info('Job order updated successfully', [
                'job_order_id' => $jobOrderId,
                'updated_data' => $validated,
            ]);

            // Redirect back to the job order details page with a success message
            return redirect()->route('job_orders.index', ['project_id' => $jobOrder->project_id])
                ->with('success', 'Job order updated successfully.');

        } catch (\Exception $e) {
            // Log any errors
            Log::error('Error updating job order: ' . $e->getMessage(), [
                'job_order_id' => $jobOrderId,
                'trace' => $e->getTraceAsString()
            ]);

            // Return an error response to the frontend
            return redirect()->back()->with('error', 'An error occurred while updating the job order.');
        }
    }
}
