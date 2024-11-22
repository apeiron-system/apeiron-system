<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\JobOrderContractModel;
use Illuminate\Support\Facades\DB;

class JobOrderContractController extends Controller
{
    public function index(Request $request)
    {
        $sortBy = $request->input('sort', 'recent');

        // Start a database transaction to safely calculate progress
        DB::beginTransaction();

        try {
            // Retrieve active contracts with their cumulative progress
            $activeContracts = JobOrderContractModel::active()
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
            $pastContracts = JobOrderContractModel::past()
                ->with('projects') // Eager load projects
                ->paginate(3)
                ->through(function ($contract) {
                    $totalProgress = $contract->projects->count() > 0
                        ? $contract->projects->avg('progress') // Calculate average progress
                        : 0; // Default progress if no projects
                    $contract->progress = round($totalProgress, 2); // Add progress attribute
                    return $contract;
                });

            // Commit the transaction after successful updates
            DB::commit();
        } catch (\Exception $e) {
            // Rollback transaction if there's an error
            DB::rollBack();
            throw $e;
        }

        return Inertia::render('JobOrder/JobOrderContractsPage', [
            'activeContracts' => $activeContracts,
            'pastContracts' => $pastContracts,
            'sortBy' => $sortBy,
        ]);
    }
}
