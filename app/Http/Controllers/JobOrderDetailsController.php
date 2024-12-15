<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ProjectPartItemModel;
use App\Models\JobOrderContractModel;
use App\Models\JobOrderProjectModel;
use App\Models\JobOrderModel;
use App\Models\ProjectPartModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class JobOrderDetailsController extends Controller
{
    /**
     * Display the details of a specific job order.
     *
     * @param Request $request
     * @param string $jo_no
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Get job order number from the request
        $jo_no = $request->query('jo_no');

        // Fetch the job order by jo_no
        $jobOrder = JobOrderModel::where('jo_no', $jo_no)->firstOrFail();

        // Retrieve the associated project name
        $projectName = JobOrderProjectModel::where('id', $jobOrder->project_id)->value('project_name');

        // Retrieve the associated contract name
        $contractName = JobOrderContractModel::where('id', $jobOrder->contract_id)->value('contract_name');

        // Fetch project parts linked to the job order
        $projectParts = ProjectPartModel::where('jo_no', $jo_no)->get();
        // dd($projectParts);
        // Map project parts with their items
        $projectPartsWithItems = $projectParts->map(function ($projectPart) {
            // Fetch all items associated with the project part, including unit_cost from item_prices
            $items = ProjectPartItemModel::where('project_part_id', $projectPart->id)
                ->join('items', 'project_part_items.item_id', '=', 'items.id')
                ->join('item_prices', 'items.id', '=', 'item_prices.item_id')  // Join with item_prices to get unit_cost
                ->select(
                    'items.id as itemNo',
                    'items.description as description',
                    'items.unit as unit',
                    'project_part_items.quantity as quantity',
                    'item_prices.unit_cost as unit_cost',  // Get unit_cost from item_prices
                )
                ->get();

            // Add the project part's description to each project part item data
            return [
                'projectPart' => [
                    'id' => $projectPart->id,
                    'description' => $projectPart->description,  // Get the project part description
                ],
                'items' => $items
            ];
        });

        // dd($projectPartsWithItems->pluck('items')->flatten()->pluck('amount'));
        // Structure the response for the frontend
        return Inertia::render('JobOrder/JobOrderDetailsPage', [
            'jobOrder' => $jobOrder,
            'projectName' => $projectName,
            'contractName' => $contractName,
            'projectParts' => $projectPartsWithItems,
        ]);
    }

    public function destroy(Request $request)
    {
        $jobOrderId = $request->query('jo_no');

        // If the job order does not exist
        if (!$jobOrderId) {
            return response()->json(['success' => false, 'message' => 'Job order ID not found.'], 404);
        }

        try {
            // Find the job order by its ID
            $jobOrder = JobOrderModel::where('jo_no', $jobOrderId)->firstOrFail();

            // Option 1: Nullify the foreign key in project_parts table
            ProjectPartModel::where('jo_no', $jobOrder->jo_no)->update(['jo_no' => null]);

            // Option 2: Delete related project parts (if you prefer deleting them instead of nullifying)
            // ProjectPartModel::where('jo_no', $jobOrder->jo_no)->delete();

            // Delete the job order
            $jobOrder->delete();

            // Optionally, log the successful deletion
            Log::info('Job order deleted successfully', [
                'jo_no' => $jobOrderId,
            ]);

            // Return a success response
            return response()->json([
                'success' => true,
                'message' => 'Job order and related project parts deleted successfully!'
            ], 200);
        } catch (\Exception $e) {
            // Handle any errors that may occur during the deletion
            Log::error('Error deleting job order', [
                'jo_no' => $jobOrderId,
                'error_message' => $e->getMessage(),
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error deleting job order: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request)
    {
        // Extract job order number from query
        $jo_no = $request->query('jo_no');

        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'jo_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'itemWorks' => 'required|string|max:255',
            'periodCovered' => 'required|string|max:255',
            'supplier' => 'required|string|max:255',
            'dateNeeded' => 'required|date',
            'status' => 'required|string|max:50',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Find the job order by its job order number
            $jobOrder = JobOrderModel::where('jo_no', $jo_no)->firstOrFail();

            // Update the job order with the validated data
            $jobOrder->update([
                'jo_name' => $request->input('jo_name'),
                'location' => $request->input('location'),
                'itemWorks' => $request->input('itemWorks'),
                'period_covered' => $request->input('periodCovered'),
                'supplier' => $request->input('supplier'),
                'dateNeeded' => $request->input('dateNeeded'),
                'status' => $request->input('status'),
            ]);

            // Optionally log the update
            Log::info('Job order updated successfully', ['jo_no' => $jo_no]);

            return response()->json([
                'success' => true,
                'message' => 'Job order updated successfully!',
                'data' => $jobOrder,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating job order: ' . $e->getMessage(), [
                'jo_no' => $jo_no,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error updating job order. Please try again later.',
            ], 500);
        }
    }
}
