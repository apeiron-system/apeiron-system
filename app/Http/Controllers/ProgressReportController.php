<?php

namespace App\Http\Controllers;

use App\Services\ItemService;
use Inertia\Inertia;

class ProgressReportController extends Controller
{
    protected $itemService;

    public function __construct(ItemService $itemService)
    {
        $this->itemService = $itemService;
    }

    // Display all contract cards, no items
    public function index()
    {
        $contracts = $this->itemService->getContracts();

        // Add status and dotColor to each contract
        $contracts = $contracts->map(function ($contract) {
            $contract['dotColor'] = $this->getDotColor($contract['status']); // Map status to dotColor
            return $contract;
        });

        return Inertia::render('ProgressReport/ProgressReportPage', ['contracts' => $contracts]);
    }

    private function getDotColor($status)
    {
        return match ($status) {
            'pending' => 'yellow',
            'ongoing' => 'green',
            'canceled' => 'red',
            'completed' => 'gray',
            default => 'gray',
        };
    }

    public function showContract()
    {
        return Inertia::render('ProgressReport/ParDetailsPage/ProjectPARPage');
    }
}
