<?php

namespace App\Http\Controllers;

use App\Models\JobOrderModel;
use App\Models\JobOrderProjectModel;
use App\Models\ProjectPartModel;
use App\Models\ProjectPartItemModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class JobOrderProgressBillingController extends Controller
{
    public function show(Request $request)
    {
        // Get job order number from the request
        $jo_no = $request->query('jo_no');
        
        // Fetch the job order by jo_no
        $jobOrder = JobOrderModel::where('jo_no', $jo_no)->firstOrFail();
        
        // Retrieve the associated project location by concatenating the address fields
        $projectLocation = JobOrderModel::where('jo_no', $jobOrder->jo_no)
        ->join('project', 'job_orders.project_id', '=', 'project.id') // Join with the project table
        ->selectRaw("
            CONCAT(
                project.street_address, ', ',
                project.barangay, ', ',
                project.city, ', ',
                project.province, ', ',
                project.zip_code, ', ',
                project.country
            ) as location
        ")
        ->value('location'); // Fetch the concatenated location

        // Fetch project parts linked to the job order
        $projectParts = ProjectPartModel::where('jo_no', $jo_no)->get();
        
        // Map project parts with their items
        $projectPartsWithItems = $projectParts->map(function ($projectPart) {
            // Fetch all items associated with the project part, including unit_cost from item_prices
            $items = ProjectPartItemModel::where('project_part_id', $projectPart->id)
                ->join('items', 'project_part_items.item_id', '=', 'items.id')
                ->join('item_prices', 'items.id', '=', 'item_prices.item_id') // Join with item_prices to get unit_cost
                ->select(
                    'items.id as itemNo',
                    'items.description as description',
                    'items.unit as unit',
                    'project_part_items.quantity as quantity',
                    'item_prices.unit_cost as unit_cost' // Get unit_cost from item_prices
                )
                ->get();

            // Add the project part's description to each project part item data
            return [
                'projectPart' => [
                    'id' => $projectPart->id,
                    'description' => $projectPart->description, // Get the project part description
                ],
                'items' => $items
            ];
        });

        // Structure the response for the frontend
        return Inertia::render('JobOrder/JobOrderProgressBillingPage', [
            'jobOrder' => $jobOrder,
            'projectLocation' => $projectLocation,
            'projectParts' => $projectPartsWithItems,
        ]);
    }
}
