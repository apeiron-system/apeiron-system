<?php

namespace App\Http\Controllers;

use App\Models\JobOrderModel;
use App\Models\ProjectPartModel;
use App\Models\ProjectPartItemModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class JobOrderProgressBillingController extends Controller
{
    public function show(Request $request)
    {
        $joNo = $request->query('jo_no');
        
        $jobOrder = JobOrderModel::with(['project'])->where('jo_no', $joNo)->firstOrFail();
        
        $projectParts = ProjectPartModel::with(['items' => function($query) use ($joNo) {
            $query->where('jo_no', $joNo);
        }])
        ->where('project_id', $jobOrder->project_id)
        ->get()
        ->map(function ($part) {
            return [
                'projectPart' => $part,
                'items' => $part->items->map(function ($item) {
                    return [
                        'itemNo' => $item->item_no,
                        'description' => $item->description,
                        'unit' => $item->unit,
                        'quantity' => $item->quantity,
                        'unit_cost' => $item->unit_cost,
                    ];
                }),
            ];
        });

        return Inertia::render('JobOrder/JobOrderProgressBillingPage', [
            'jobOrder' => $jobOrder,
            'projectParts' => $projectParts,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'jo_name' => 'required|string',
            'location' => 'required|string',
            'itemWorks' => 'required|string',
            'periodCovered' => 'required|string',
            'supplier' => 'required|string',
            'dateNeeded' => 'required|date',
            'preparedBy' => 'required|string',
            'checkedBy' => 'required|string',
            'approvedBy' => 'required|string',
            'status' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            $jobOrder = JobOrderModel::where('jo_no', $request->query('jo_no'))->firstOrFail();
            
            $jobOrder->update([
                'jo_name' => $request->jo_name,
                'location' => $request->location,
                'item_works' => $request->itemWorks,
                'period_covered' => $request->periodCovered,
                'supplier' => $request->supplier,
                'date_needed' => $request->dateNeeded,
                'prepared_by' => $request->preparedBy,
                'checked_by' => $request->checkedBy,
                'approved_by' => $request->approvedBy,
                'status' => $request->status,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Job order updated successfully',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update job order: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Request $request)
    {
        try {
            DB::beginTransaction();

            $jobOrder = JobOrderModel::where('jo_no', $request->query('jo_no'))->firstOrFail();
            $projectId = $jobOrder->project_id;
            
            $jobOrder->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Job order deleted successfully',
                'project_id' => $projectId,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete job order: ' . $e->getMessage(),
            ], 500);
        }
    }
}