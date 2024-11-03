<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Project;
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

            // Validate contract_id
            if (!$contractId) {
                throw new \InvalidArgumentException('Contract ID is required');
            }

            // Retrieve the contract by ID with its projects
            $contract = Contract::with(['projects' => function ($query) {
                $query->orderBy('item_no', 'asc')
                    ->select([
                        'id',
                        'contract_id',
                        'item_no',
                        'description',
                        'unit',
                        'qty',
                        'unit_cost',
                        'budget',
                        'progress',
                        'status'
                    ]);
            }])->findOrFail($contractId);

            // Format projects data
            $formattedProjects = $contract->projects->map(function ($project) {
                Log::info('Processing project item: ' . $project->item_no);

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

            Log::info('Project items count: ' . $formattedProjects->count());

            if ($formattedProjects->isEmpty()) {
                Log::warning('No project items found for contract ID: ' . $contractId);
            }

            return Inertia::render('JobOrder/JobOrderProjectsPage', [
                'auth' => [
                    'user' => $request->user() ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ] : null
                ],
                'projects' => $formattedProjects,
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