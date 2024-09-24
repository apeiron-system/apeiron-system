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
    public function contractIndex($contractId)
    {
        $items = ItemModel::with(['prices' => function ($query) {
            $query->orderBy('created_at', 'desc')->limit(1); // Adjust the field as necessary
        }])->where('contract_id', $contractId)->paginate(30);

        $contract = ContractModel::findOrFail($contractId);

        return Inertia::render('Item/ContractIndex', [
            'items' => $items,
            'contract' => $contract,
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
        $item = ItemModel::with('prices')->where('contract_id', $contractId)->findOrFail($id);
        return Inertia::render('Item/Edit', [
            'item' => $item,
            'contractId' => $contractId,
        ]);
    }

    // Update the specified item
    public function update(Request $request, $contractId, $id)
    {
        $validated = $request->validate([
            'description' => 'required|string',
            'type' => 'required|string',
            'unit' => 'required|string',
            'unit_cost' => 'required|numeric',
            'prices' => 'array',
            'prices.*.unit_cost' => 'required|numeric',
            'prices.*.is_current' => 'required|boolean',
        ]);

        $itemModel = ItemModel::where('contract_id', $contractId)->findOrFail($id);
        $itemModel->editItem($validated);

        // Update prices if provided
        if (isset($validated['prices'])) {
            $itemModel->prices()->delete(); // Optionally clear old prices
            foreach ($validated['prices'] as $price) {
                $itemModel->addItemPrice($price);
            }
        }

        return redirect()->route('contracts.items.index', $contractId)->with('success', 'Item updated successfully.');
    }

    // Remove the specified item
    public function destroy($contractId, $id)
    {
        $itemModel = new ItemModel();
        $itemModel->deleteItem($id, true); // Deletes the item and its prices

        return redirect()->route('contracts.items.index', $contractId)->with('success', 'Item deleted successfully.');
    }
}
