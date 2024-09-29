<?php

namespace App\Http\Controllers;

use App\Services\ItemService;
use App\Models\ContractModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
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
        return Inertia::render('Item/Index', ['contracts' => $contracts]);
    }

    // Display the item listing for a specific contract
    public function contractIndex(Request $request, $contractId)
    {
        $items = $this->itemService->getItemsForContract($request, $contractId);
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
        return Inertia::render('Item/Create', ['contract' => $contract]);
    }

    // Store newly created items under a specific contract
    public function store(Request $request, $contractId)
    {
        $items = json_decode($request->getContent(), true);
        $this->itemService->storeItems($contractId, $items);

        return redirect()->route('item.contract', $contractId)->with('success', 'Items processed successfully.');
    }

    // Show the form for editing an item
    public function edit($contractId, $id)
    {
        $item = $this->itemService->getItemWithPrices($contractId, $id);
        return Inertia::render('Item/Edit', ['item' => $item, 'contractId' => $contractId]);
    }

    // Update the specified item
    public function update(Request $request, $contractId, $id)
    {
        $data = json_decode($request->getContent(), true);
        $this->itemService->updateItem($contractId, $id, $data);

        return redirect()->route('item.contract.show', ['contract' => $contractId, 'item' => $id])->with('success', 'Item updated successfully.');
    }

    // Remove the specified item
    public function destroy(Request $request, $contractId)
    {
        $ids = json_decode($request->getContent(), true);
        $this->itemService->deleteItems($ids);

        return redirect()->route('item.contract', $contractId)->with('success', 'Items deleted successfully.');
    }

    // Get one item
    public function show($contractId, $id)
    {
        $item = $this->itemService->getItemWithPrices($contractId, $id);
        return Inertia::render('Item/Show', ['item' => $item, 'contractId' => $contractId]);
    }
}
