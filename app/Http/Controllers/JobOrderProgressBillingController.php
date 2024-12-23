<?php

namespace App\Http\Controllers;

use App\Models\JobOrderModel;
use App\Models\ProjectPartModel;
use App\Models\ProjectPartItemModel;
use App\Models\ProgressBillingProjectPartItemModel;
use App\Models\JobOrderProgressBillingModel;
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

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'actual_costs' => 'required|array', // Validate the actual_cost array
            'actual_costs.*.project_part_id' => 'required|integer|exists:project_part,id',
            'actual_costs.*.item_id' => 'required|integer|exists:project_part_items,item_id',
            'actual_costs.*.actual_cost' => 'required|numeric|max:255',
            'pb_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        DB::beginTransaction(); // Start transaction

        try {
            // Transform the validated data for progress billing
            $progressBilling = [
                'jo_no' => $validatedData['jo_no'],
                'project_id' => $validatedData['project_id'],
                'pb_name' => $validatedData['pb_name'],
                'start_date' => $validatedData['start_date'],
                'end_date' => $validatedData['end_date'],
            ];

            // Create the progress billing record
            $progressBillingRecord = JobOrderProgressBillingModel::create($progressBilling);

            // Store actual_cost (project_part_id, item_id, and actual_cost)
            foreach ($validatedData['actual_cost'] as $actualCost) {
                ProgressBillingProjectPartItemModel::create([
                    'project_part_id' => $actualCost['project_part_id'],
                    'item_id' => $actualCost['item_id'],
                    'actual_cost' => $actualCost['actual_cost'],
                    'progress_billing_id' => $progressBillingRecord->bill_num,
                ]);
            }

            DB::commit(); // Commit transaction

            return response()->json([
                'success' => true,
                'message' => 'Job Order and Progress Billing created successfully!',
                'progress_billing' => $progressBillingRecord,
            ]);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaction on error
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating progress billing.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}

