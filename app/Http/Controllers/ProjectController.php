<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects for a specific contract.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
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
            $contract = Contract::with(['projects' => function ($query) {
                $query->orderBy('item_no', 'asc');
            }])->findOrFail($contractId);

            // Map project data to pass to the view
            $projects = $contract->projects->map(function ($project) {
                return [
                    'id' => $project->id,
                    'item_no' => $project->item_no,
                    'description' => $project->description,
                    'unit' => $project->unit,
                    'qty' => $project->qty,
                    'unit_cost' => $project->unit_cost,
                    'budget' => $project->budget,
                    'progress' => $project->progress,
                    'status' => $project->status,
                ];
            });

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
