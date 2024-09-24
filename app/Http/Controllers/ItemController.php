<?php

namespace App\Http\Controllers;

use App\Models\ContractModel;
use App\Models\ItemModel;
use App\Models\ItemPriceModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ItemController extends Controller
{


    //display all contract cards, no items
    public function index()
    {
        $contracts = ContractModel::all();
        return Inertia::render('Item/Index', [
            'contracts' => $contracts,
        ]);
    }

    // Display the item listing for a specific contract
    public function contractIndex(Request $request, $contractId)
    {
        $query = ItemModel::where('contract_id', $contractId)->with('prices');

        // Apply search filter
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('description', 'like', '%' . $request->search . '%')
                    ->orWhere('type', 'like', '%' . $request->search . '%');
            });
        }

        // Apply sorting
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'az':
                    $query->orderBy('description', 'asc');
                    break;
                case 'za':
                    $query->orderBy('description', 'desc');
                    break;
                case 'date_asc':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'date_desc':
                default:
                    $query->orderBy('created_at', 'desc');
                    break;
            }
        } else {
            // Default sorting by latest
            $query->orderBy('created_at', 'desc');
        }

        // Paginate the results
        $items = $query->paginate(10);

        $contract = ContractModel::findOrFail($contractId);

        return Inertia::render('Item/ContractIndex', [
            'items' => $items,
            'contract' => $contract,
            'filters' => $request->only(['search', 'sort']),
        ]);
    }


    // Show the form for creating a new item under a specific contract
    public function create($contractId)
    {
        $contract = ContractModel::findOrFail($contractId);

        return Inertia::render('Item/Create', [
            'contract' => $contract,
        ]);
    }

    // Store newly created items under a specific contract
    public function store(Request $request, $contractId)
    {
        // Get request data
        $array = $request->getContent();
        $items = json_decode($array, true);

        foreach ($items as $item) {
            $validated = $item;

            // Check if the description already exists for the current contract
            $existingItem = ItemModel::where('contract_id', $contractId)
                ->where('description', $validated['description'])
                ->first();

            // If the item already exists, skip to the next iteration
            if ($existingItem) {
                continue;
            }

            // If the item does not exist, create a new item and price
            $itemModel = new ItemModel();
            $itemModel->contract_id = $contractId;
            $itemModel->description = $validated['description'];
            $itemModel->type = $validated['type'];
            $itemModel->unit = $validated['unit'];

            $itemModel->save();

            // Add the price for the new item
            $priceModel = new ItemPriceModel();
            $priceModel->unit_cost = $validated['unit_cost'];
            $priceModel->is_current = true;
            $priceModel->item_id = $itemModel->id;
            $priceModel->save();
        }

        return redirect()->route('item.contract', $contractId)->with('success', 'Items processed successfully.');
    }


    // Show the form for editing an item
    public function edit($contractId, $id)
    {
        // Retrieve the item and eager load only the latest price
        $item = ItemModel::with(['prices' => function ($query) {
            $query->latest()->limit(1); // Get only the latest price
        }])->where('contract_id', $contractId)->findOrFail($id);

        return Inertia::render('Item/Edit', [
            'item' => $item,
            'contractId' => $contractId,
        ]);
    }


    // Update the specified item
    public function update(Request $request, $contractId, $id)
    {

        $data = $request->getContent();

        $data = json_decode($data, true);

        $item = ItemModel::where('id', $id)->findOrFail($id);

        Log::info($data);
        Log::info($item);

        $item->description = $data['description'];
        $item->type = $data['type'];
        $item->unit = $data['unit'];

        //check if unit cost is the same as the latest price unit cost, if yes, ignore. if different, make a new price model and add to the item

        $latestPrice = $item->getLatestPrice();

        if ($latestPrice->unit_cost != $data['unit_cost']) {
            $priceModel = new ItemPriceModel();
            $priceModel->unit_cost = $data['unit_cost'];
            $latestPrice->is_current = false;
            $priceModel->is_current = true;
            $priceModel->item_id = $item->id;
            $latestPrice->save();
            $priceModel->save();
        }

        $item->save();


        return redirect()->route('item.contract.show', ["contract" => $contractId, "item" => $id])->with('success', 'Item updated successfully.');
    }

    // Remove the specified item
    public function destroy(Request $request, $contractId)
    {

        Log::info("sheei");

        $idArray = $request->getContent();
        $ids = json_decode($idArray, true);

        Log::info($idArray);

        foreach ($ids as $id) {
            $item = ItemModel::where('id', $id)->findOrFail($id);
            $item->delete();
        }

        return redirect()->route('item.contract', ["contract" => $contractId])->with('success', 'Item deleted successfully.');
    }

    //get one item
    public function show($contractId, $id)
    {

        //the prices should be order latest by

        $item = ItemModel::with(['prices' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->where('contract_id', $contractId)->findOrFail($id);


        return Inertia::render('Item/Show', [
            'item' => $item,
            'contractId' => $contractId,
        ]);
    }
}
