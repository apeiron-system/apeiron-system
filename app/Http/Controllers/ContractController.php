<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contract;

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

            // Commit the transaction after successful updates
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack(); // Rollback the transaction on error
            throw $e; // Re-throw the exception for debugging/logging
        }

        return Inertia::render('JobOrder/JobOrderContractsPage', [
            'activeContracts' => $activeContracts,
            'pastContracts' => $pastContracts,
        ]);
    }
}
