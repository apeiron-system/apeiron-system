<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contract;

class ContractController extends Controller
{
    public function index(Request $request)
    {
        $sortBy = $request->input('sort', 'recent');

        // Retrieve active contracts with their cumulative progress
        $activeContracts = Contract::where('status', 'active')
            ->with('projects') // Eager load projects to minimize queries
            ->get()
            ->map(function ($contract) {
                $totalProgress = $contract->projects->count() > 0
                    ? $contract->projects->avg('progress') // Calculate average progress
                    : 0; // Default progress if no projects
                $contract->progress = round($totalProgress, 2); // Add progress attribute
                return $contract;
            });

        // Retrieve past contracts with their cumulative progress
        $pastContracts = Contract::where('status', 'past')
            ->with('projects') // Eager load projects
            ->paginate(3)
            ->through(function ($contract) {
                $totalProgress = $contract->projects->count() > 0
                    ? $contract->projects->avg('progress') // Calculate average progress
                    : 0; // Default progress if no projects
                $contract->progress = round($totalProgress, 2); // Add progress attribute
                return $contract;
            });

        return Inertia::render('JobOrder/JobOrderContractsPage', [
            'activeContracts' => $activeContracts,
            'pastContracts' => $pastContracts,
            'sortBy' => $sortBy,
        ]);
    }
}
