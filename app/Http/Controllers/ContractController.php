<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contract;
use Illuminate\Support\Facades\DB;

class ContractController extends Controller
{
    public function index(Request $request)
    {
        $sortBy = $request->input('sort', 'recent');

        // Start a database transaction to update the progress of each contract and related projects
        DB::beginTransaction();

        // Retrieve active contracts with their cumulative progress
        $activeContracts = Contract::where('status', 'active')
            ->with('projects') // Eager load projects to minimize queries
            ->get()
            ->map(function ($contract) {
                // Calculate the cumulative progress for the contract
                $totalProgress = $contract->projects->count() > 0
                    ? $contract->projects->avg('progress') // Calculate average progress of all projects under the contract
                    : 0; // Default progress if no projects
                $contract->progress = round($totalProgress, 2); // Add progress attribute
                return $contract;
            });

        // Retrieve past contracts with their cumulative progress
        $pastContracts = Contract::where('status', 'past')
            ->with('projects') // Eager load projects
            ->paginate(3)
            ->through(function ($contract) {
                // Calculate and update the progress for past contracts
                $totalProgress = $contract->projects->count() > 0
                    ? $contract->projects->avg('progress') // Calculate average progress of all projects under the contract
                    : 0;
                $contract->progress = round($totalProgress, 2);
                $contract->save(); // Save the updated progress to the database
                return $contract;
            });

        // Commit the transaction after successful updates
        DB::commit();

        // Pass the contracts and progress data to the Inertia view
        return Inertia::render('JobOrder/JobOrderContractsPage', [
            'activeContracts' => $activeContracts,
            'pastContracts' => $pastContracts,
            'sortBy' => $sortBy,
        ]);
    }
}
