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

        // Start a database transaction to ensure consistent updates
        DB::beginTransaction();

        try {
            // Retrieve and update active contracts
            $activeContracts = Contract::where('status', 'active')
                ->with('projects') // Eager load projects
                ->get()
                ->map(function ($contract) {
                    $totalProgress = $contract->projects->count() > 0
                        ? $contract->projects->avg('progress') // Calculate average progress
                        : 0; // Default progress if no projects

                    $contract->progress = round($totalProgress, 2); // Add progress attribute
                    $contract->save(); // Save the updated progress to the database
                    return $contract;
                });

            // Retrieve and update past contracts
            $pastContracts = Contract::where('status', 'past')
                ->with('projects') // Eager load projects
                ->paginate(3)
                ->through(function ($contract) {
                    $totalProgress = $contract->projects->count() > 0
                        ? $contract->projects->avg('progress') // Calculate average progress
                        : 0; // Default progress if no projects

                    $contract->progress = round($totalProgress, 2); // Add progress attribute
                    $contract->save(); // Save the updated progress to the database
                    return $contract;
                });

            // Commit the transaction after successful updates
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack(); // Rollback the transaction on error
            throw $e; // Re-throw the exception for debugging/logging
        }

        return Inertia::render('JobOrder/JobOrderContractsPage', [
            'activeContracts' => $activeContracts,
            'pastContracts' => $pastContracts,
            'sortBy' => $sortBy,
        ]);
    }
}
