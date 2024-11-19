<?php

namespace App\Http\Controllers;

use App\Models\ContractModel;
use App\Models\ItemModel;
use App\Models\ProjectPartItemModel;
use App\Models\ProjectPartModel;
use App\Models\ProjectModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectPartItemController extends Controller
{
    public function view($contract_id, $project_id, $project_part_id)
    {
        $contract = ContractModel::findOrFail($contract_id);
        $project = ProjectModel::findOrFail($project_id);
        $projectPart = ProjectPartModel::with('parent', 'project')->findOrFail($project_part_id);

        // Fetch items grouped by type with their corresponding bids
        $itemsByType = [
            'materials' => ProjectPartItemModel::with(['item', 'item.bids' => function ($query) use ($contract_id) {
                                $query->where('contract_id', $contract_id);
                            }])
                            ->where('contract_id', $contract_id)
                            ->where('project_part_id', $project_part_id)
                            ->whereHas('item', function ($query) {
                                $query->where('type', 'material');
                            })
                            ->get(),
            'labor' => ProjectPartItemModel::with(['item', 'item.bids' => function ($query) use ($contract_id) {
                                $query->where('contract_id', $contract_id);
                            }])
                            ->where('contract_id', $contract_id)
                            ->where('project_part_id', $project_part_id)
                            ->whereHas('item', function ($query) {
                                $query->where('type', 'labor');
                            })
                            ->get(),
            'equipment' => ProjectPartItemModel::with(['item', 'item.bids' => function ($query) use ($contract_id) {
                                $query->where('contract_id', $contract_id);
                            }])
                            ->where('contract_id', $contract_id)
                            ->where('project_part_id', $project_part_id)
                            ->whereHas('item', function ($query) {
                                $query->where('type', 'equipment');
                            })
                            ->get(),
        ];

        return Inertia::render('Contract/Project/ProjectPart/ViewProjectPartPage', [
            'contract' => $contract,
            'project' => $project,
            'projectParts' => $projectPart,
            'materials' => $itemsByType['materials']->map(function ($item) {
                return [
                    'id' => $item->id,
                    'description' => $item->item->description,
                    'quantity' => $item->quantity,
                    'bid_amount' => $item->item->bids->first() ? $item->item->bids->first()->bid_amount : null,
                ];
            }),
            'labor' => $itemsByType['labor']->map(function ($item) {
                return [
                    'id' => $item->id,
                    'description' => $item->item->description,
                    'quantity' => $item->quantity,
                    'bid_amount' => $item->item->bids->first() ? $item->item->bids->first()->bid_amount : null,
                ];
            }),
            'equipment' => $itemsByType['equipment']->map(function ($item) {
                return [
                    'id' => $item->id,
                    'description' => $item->item->description,
                    'quantity' => $item->quantity,
                    'bid_amount' => $item->item->bids->first() ? $item->item->bids->first()->bid_amount : null,
                ];
            }),
        ]);
    }

    public function getContractItems($contract_id)
    {
        $items = ItemModel::where('contract_id', $contract_id)->get();
        return response()->json($items);
    }

    public function storeProjectPartItem(Request $request, $contract_id, $project_id, $project_part_id)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.item_id' => 'required|exists:items,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        foreach ($request->input('items') as $item) {
            ProjectPartItemModel::create([
                'contract_id' => $contract_id,
                'project_part_id' => $project_part_id,
                'item_id' => $item['item_id'],
                'quantity' => $item['quantity'],
            ]);
        }

        return response()->json(['message' => 'Items added successfully'], 200);
    }

    public function destroy($contract_id, $project_id, $project_part_id, $item_id)
    {
        $item = ProjectPartItemModel::findOrFail($item_id);
        $item->delete();

        return redirect()->back()->with('success', 'Item deleted successfully');
    }

}
