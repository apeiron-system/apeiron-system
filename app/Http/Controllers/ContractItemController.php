<?php

namespace App\Http\Controllers;

use App\Services\ItemService;
use App\Models\ContractModel;
use App\Models\ItemModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;


class ContractItemController extends Controller
{
    protected $itemService;

    public function __construct(ItemService $itemService)
    {
        $this->itemService = $itemService;
    }

    public function showItemsForContract(Request $request, $contractId)
    {
        // Get items for the contract
        $items = $this->itemService->getItemsForContract($request, $contractId);
    
        // Find the contract by ID
        $contract = ContractModel::with('signingAuthorityEmployee')->findOrFail($contractId);
    
        // Pass the signing authority employee and other data to the view
        return Inertia::render('Contract/ContractItem/ContractItemsPage', [
            'items' => $items,
            'contract' => $contract,
            'signingAuthorityEmployee' => $contract->signingAuthorityEmployee, // Include signing authority employee
            'filters' => $request->only(['search', 'sort']),
        ]);
    }
    

     // Show the bid page for a specific item
     public function showBidPage($contractId, $itemId)
     {
         $contract = ContractModel::findOrFail($contractId);
         $item = ItemModel::with('prices')->findOrFail($itemId);
 
         return Inertia::render('Contract/ContractItem/BidPage', [
            'contractId' => $contractId,
            'item' => $item,
        ]);
        
     }
 
     // Method to update the price of an item
     public function updateItemPrice(Request $request, $contractId, $itemId)
     {
         // Decode the JSON content from the request
         $data = json_decode($request->getContent(), true);
 
         // Validate the price
         $request->validate([
             'price' => 'required|numeric|min:0',
         ]);
 
         // Call the service to update the item's price
         $this->itemService->updateItemPrice($contractId, $itemId, $data['price']);
 
         // Redirect back with success message
         return redirect()->route('item.contract.show', ['contract' => $contractId, 'item' => $itemId])
                          ->with('success', 'Item price updated successfully.');
     }
}
