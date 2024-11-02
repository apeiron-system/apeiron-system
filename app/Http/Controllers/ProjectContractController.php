<?php

namespace App\Http\Controllers;

use App\Models\ProjectContract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProjectContractController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get the contract name from the request
            $contractName = $request->query('contractName');

            // Load projects associated with the contract name
            $projectContracts = ProjectContract::where('contract_name', $contractName)->get();

            // Query project contracts, filtering by contract name if given
            $projectContracts = ProjectContract::with([
                'submittedByEmployee',
                'signingAuthorityEmployee',
                'authorizedRepresentativeEmployee'
            ])->get();

            Log::info('Project Contracts count: ' . $projectContracts->count());

            if ($projectContracts->isEmpty()) {
                Log::warning('No project contracts found in database');
                return Inertia::render('JobOrder/JobOrderProjectsPage', [
                    'projectContracts' => [],
                ]);
            }

            $formattedProjects = $projectContracts->map(function ($project) {
                Log::info('Processing project: ' . $project->contract_name);

                return [
                    'id' => $project->id,
                    'name' => $project->contract_name,
                    'description' => $project->description,
                    'location' => $project->location,
                    'designation' => $project->designation,
                    'date' => $project->date,
                    'submittedBy' => $project->submittedByEmployee?->name ?? 'N/A',
                    'signingAuthority' => $project->signingAuthorityEmployee?->name ?? 'N/A',
                    'authorizedRepresentative' => $project->authorizedRepresentativeEmployee?->name ?? 'N/A',
                    'items' => [] // Empty array for now since pay_items table doesn't exist yet
                ];
            });

            return Inertia::render('JobOrder/JobOrderProjectsPage', [
                'projectContracts' => $formattedProjects,
                'contractName' => $contractName,
            ]);

        } catch (\Exception $e) {
            Log::error('Error in ProjectContractController@index: ' . $e->getMessage());
            
            return Inertia::render('JobOrder/JobOrderProjectsPage', [
                'projectContracts' => [],
                'error' => 'Failed to load project contracts. Error: ' . $e->getMessage()
            ]);
        }
    }
}