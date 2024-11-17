<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contract;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\progress;

class ContractController extends Controller
{
    public function index()
    {
        // Start a database transaction to update the progress of each project
        DB::beginTransaction();

        // Retrieve active contracts with their cumulative progress
        $activeContracts = Contract::where('status', 'active')
            ->with('projects') // Eager load projects to minimize queries
            ->get()
            ->map(function ($contract) {
                $totalProgress = $contract->projects->count() > 0
                    ? $contract->projects->avg('progress') // Calculate average progress
                    : 0; // Default progress if no projects
                $contract->progress = round($totalProgress, 2); // Add progress attribute
                $contract->save(); // Save the updated progress to the database
                return $contract;
            });

        // Retrieve past contracts with their cumulative progress
        $pastContracts = Contract::where('status', 'past')
            ->with('projects') // Eager load projects
            ->paginate(3)
            ->through(function ($contract){
                $totalProgress = $contract->projects->count() > 0
                    ? $contract->projects->avg('progress') // Calculate average progress
                    : 0; // Default progress if no projects
                $contract->progress = round($totalProgress, 2); // Add progress attribute
                $contract->save(); // Save the updated progress to the database
                return $contract;
            });
        
        // Commit the transaction after successful updates
        DB::commit();

        return Inertia::render('JobOrder/JobOrderContractsPage', [
            'activeContracts' => $activeContracts,
            'pastContracts' => $pastContracts,
        ]);
    }
}
