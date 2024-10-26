<?php

namespace App\Http\Controllers;

use App\Services\ItemService;
use App\Models\ContractModel;
use App\Models\ItemModel;
use App\Models\Bid;
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
         $item = ItemModel::with('bids')->findOrFail($itemId);
 
         return Inertia::render('Contract/ContractItem/BidPage', [
            'contractId' => $contractId,
            'item' => $item,
            'bids' => $item->bids,
        ]);
        
     }
 
     //method for putting a bid on an item
     public function storeBid(Request $request, $contractId, $itemId)
     {
         $validatedData = $request->validate([
             'bid_amount' => 'required|numeric|min:0',
         ]);
     
         // Create a new bid for the specified item and contract
         Bid::create([
             'contract_id' => $contractId,
             'item_id' => $itemId,
             'bid_amount' => $validatedData['bid_amount'],
         ]);
     
         // Redirect to the contract's items page with a success message
         return redirect()->route('item.contract.bid', ['contractId' => $contractId, 'itemId' => $itemId])
         ->with('success', 'Bid placed successfully.');
     }
     
     //delete selected bids
     public function deleteBids(Request $request, $contractId, $itemId)
{
    $bidIds = $request->input('bidIds');

    if (is_array($bidIds) && !empty($bidIds)) {
        Bid::whereIn('id', $bidIds)->where('item_id', $itemId)->delete();
    }

    return redirect()->back()->with('success', 'Selected bids deleted successfully.');
}

}
