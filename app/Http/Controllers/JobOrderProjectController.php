<?php

namespace App\Http\Controllers;

use App\Models\JobOrderContractModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobOrderProjectController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get the contract ID from the request
            $contractId = $request->query('contract_id');

            // Validate the presence of contract_id
            if (!$contractId) {
                throw new \InvalidArgumentException('Contract ID is required.');
            }

            // Fetch the contract with the specified contract ID and its associated projects
            $contract = JobOrderContractModel::with(['projects' => function ($query) {
                $query->orderBy('id', 'asc');
            }])->findOrFail($contractId);

            // Map project data to pass to the view
            $projects = $contract->projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'status' => $project->status,
                    'location' => $project->location,
                ];
            });

            return Inertia::render('JobOrder/JobOrderProjectsPage', [
                'projects' => $projects,
                'contractName' => $contract->contract_name,
            ]);

        } catch (\Exception $e) {
            // Log the error
            Log::error('Error in ProjectController@index: ' . $e->getMessage(), [
                'contract_id' => $request->query('contract_id'),
                'trace' => $e->getTraceAsString()
            ]);

            return Inertia::render('JobOrder/JobOrderProjectsPage', [
                'auth' => [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ] : null
                ],
                'projects' => [],
                'contractName' => null,
                'error' => 'Failed to load projects. Please try again later.'
            ]);
        }
    }
}
