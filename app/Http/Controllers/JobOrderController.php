<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Project;
use App\Models\JobOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobOrderController extends Controller
{
    /**
     * Display a listing of job orders for a specific project under a specific contract.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        try {
            // Get project ID from the request (URL parameters)
            $projectId = $request->query('project_id');

            // Validate the presence of project_id
            if (!$projectId) {
                throw new \InvalidArgumentException('Project ID is required.');
            }

            // Fetch the project and its associated job orders
            $project = Project::with(['jobOrders' => function ($query) {
                $query->orderBy('jo_no', 'asc'); // Sort job orders by jo_no
            }])->findOrFail($projectId);

            // Ensure there are job orders
            $jobOrders = $project->jobOrders;

            // If there are job orders, get the contract_id from the first job order
            $contractId = $jobOrders->isNotEmpty() ? $jobOrders->first()->contract_id : $project->contract_id;

            // Map the job orders to match the frontend's required structure
            $jobOrders = $jobOrders->map(function ($jobOrder) {
                return [
                    'jo_no' => $jobOrder->jo_no,
                    'jo_name' => $jobOrder->jo_name,
                    'contract_id' => $jobOrder->contract_id,
                    'project_id' => $jobOrder->project_id,
                    'location' => $jobOrder->location,
                    'period_covered' => $jobOrder->period_covered,
                    'supplier' => $jobOrder->supplier,
                    'preparedBy' => $jobOrder->preparedBy,
                    'checkedBy' => $jobOrder->checkedBy,
                    'approvedBy' => $jobOrder->approvedBy,
                    'itemWorks' => $jobOrder->itemWorks,
                    'dateNeeded' => $jobOrder->dateNeeded ? $jobOrder->dateNeeded->format('Y-m-d') : null, // Handle null dates
                    'progress' => $jobOrder->progress,
                    'status' => $jobOrder->status,
                ];
            });

            // Extract project name and location from the project
            $projectName = $project->description;
            $projectLocation = $project->location;

            return Inertia::render('JobOrder/JobOrderPage', [
                'auth' => [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ] : null
                ],
                'contractId' => $contractId, // Pass contract_id of the first job order
                'jobOrders' => $jobOrders,
                'projectName' => $projectName, // Pass the project name to the frontend
                'projectLocation' => $projectLocation, // Pass the project location to the frontend
            ]);

        } catch (\Exception $e) {
            // Log any errors that occur during the process
            Log::error('Error in JobOrderController@index: ' . $e->getMessage(), [
                'project_id' => $request->query('project_id'),
                'trace' => $e->getTraceAsString()
            ]);

            // Return an error response to Inertia
            return Inertia::render('JobOrder/JobOrderPage', [
                'auth' => [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ] : null
                ],
                'contractId' => null, // Pass null if no job orders are found
                'jobOrders' => [],
                'projectName' => null, // Pass null if no project is found
                'projectLocation' => null, // Pass null if no project is found
            ]);
        }
    }
}
