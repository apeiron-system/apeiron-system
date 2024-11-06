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
        $orderDirection = $sortBy === 'recent' ? 'desc' : 'asc';

        $activeContracts = Contract::where('status', 'active')
            ->orderBy('created_at', $orderDirection)
            ->get();

        $pastContracts = Contract::where('status', 'past')
            ->orderBy('created_at', $orderDirection)
            ->paginate(10);

        return Inertia::render('JobOrder/JobOrderContractsPage', [
            'activeContracts' => $activeContracts,
            'pastContracts' => $pastContracts,
            'sortBy' => $sortBy,
        ]);
    }
}