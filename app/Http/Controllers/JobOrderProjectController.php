<?php

namespace App\Http\Controllers;

use App\Models\JobOrderContractModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

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

            // Start a database transaction to update the progress of each project
            DB::beginTransaction();

            // Map project data to pass to the view, including calculating and updating average progress for each project
            $projects = $contract->projects->map(function ($project) {
                // Calculate the average progress of all job orders for the project
                $averageProgress = $project->jobOrders->avg('progress'); // Assuming jobOrders relationship is defined on the project model

                // Update the project progress in the database
                $project->progress = round($averageProgress, 2); // Set the new progress
                $project->save(); // Save the updated progress to the database

                return [
                    'id' => $project->id,
                    'description' => $project->description,
                    'progress' => $project->progress, // Use the updated progress
                    'status' => $project->status,
                    'location' => $project->location,
                ];
            });

            // Commit the transaction after successful updates
            DB::commit();

            return Inertia::render('JobOrder/JobOrderProjectsPage', [
                'auth' => [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ] : null
                ],
                'projects' => $projects,
                'contractName' => $contract->contract_name,
            ]);

        } catch (\Exception $e) {
            // Rollback the transaction in case of any errors
            DB::rollBack();

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
