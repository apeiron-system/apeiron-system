<?php

namespace App\Http\Controllers;

use App\Models\JobOrderBoqModel;
use Inertia\Inertia;
use App\Models\JobOrderContractModel;
use App\Models\JobOrderProjectModel;
use App\Models\JobOrderModel;
use App\Models\JobOrderBoqPartModel;
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
        try {
            // Get project ID from the request (URL parameters)
            $jo_no = $request->query('jo_no');
            
            // Fetch the job order by jo_no
            $jobOrder = JobOrderModel::where('jo_no', $jo_no)->firstOrFail();
            
            // Retrieve the associated project name
            $projectName = JobOrderProjectModel::where('id', $jobOrder->project_id)->value('project_name');
            
            // Retrieve the associated contract name
            $contractName = JobOrderContractModel::where('id', $jobOrder->contract_id)->value('contract_name');

            // Fetch the BOQ table based on jo_no
            $boq = JobOrderBoqModel::where('jo_no', $jo_no)->first();
            
            // Fetch BOQ parts linked to the BOQ
            $boqParts = $boq ? JobOrderBoqPartModel::where('boq_id', $boq->boq_id)->get() : collect();
            
            // Structure the response for the frontend
            return Inertia::render('JobOrder/JobOrderDetailsPage', [
                'jobOrder' => $jobOrder,
                'projectName' => $projectName,
                'contractName' => $contractName,
                'boqParts' => $boqParts,
            ]);

        } catch (\Exception $e) {
            // Log errors
            Log::error('Error in JobOrderDetailsController@index: ' . $e->getMessage(), [
                'jo_no' => $jo_no,
                'trace' => $e->getTraceAsString(),
            ]);

            // Return an error response
            return Inertia::render('JobOrder/JobOrderDetailsPage', [
                'jobOrder' => null,
                'projectName' => null,
                'contractName' => null,
                'boqParts' => [],
                'error' => 'Unable to load job order details. Please try again later.',
            ]);
        }
    }

    public function destroy(Request $request)
    {
            $jobOrderId = $request->query('jo_no');

            // If the job order does not exist
            if (!$jobOrderId) {
                return response()->json(['success' => false, 'message' => 'Job order ID not found.'], 404);
            }

            // Find the job order by its ID
            $jobOrder = JobOrderModel::where('jo_no', $jobOrderId)->firstOrFail();

            // Delete the job order
            $jobOrder->delete();
            
            // Optionally, log the successful deletion
            Log::info('Job order deleted successfully', [
                'jo_no' => $jobOrderId,
            ]);

            // Return a success response
            return response()->json([
                'success' => true,
                'message' => 'Job order deleted successfully!'
            ], 200);

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
