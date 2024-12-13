<?php

namespace App\Http\Controllers;

use App\Services\ItemService;
use App\Models\ContractModel;
use App\Models\ItemModel;
use App\Models\Bid;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Carbon\Carbon;


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
    

    public function showBidPage(Request $request, $contractId, $itemId)
{
    $contract = ContractModel::findOrFail($contractId);
    $item = ItemModel::with('bids')->findOrFail($itemId);

    $query = Bid::where('item_id', $itemId);

    // Apply date range filter
    if ($request->filled('dateRange')) {
        switch ($request->input('dateRange')) {
            case 'today':
                $query->whereDate('created_at', Carbon::today());
                break;
            case 'this_week':
                $query->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                break;
            case 'this_month':
                $query->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);
                break;
        }
    }

    // Apply sorting
    $sortField = $request->input('sortField', 'created_at'); // Default to created_at
    $sortOrder = $request->input('sort', 'desc'); // Default to descending

    if (in_array($sortField, ['created_at', 'bid_amount'])) {
        $query->orderBy($sortField, $sortOrder);
    }

    $bids = $query->get();

    return Inertia::render('Contract/ContractItem/BidPage', [
        'contractId' => $contractId,
        'item' => $item,
        'bids' => $bids,
        'filters' => $request->only(['dateRange', 'sortField', 'sort']), // Pass filters to front-end
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
         return redirect()->route('contract.items', ['contractId' => $contractId, 'itemId' => $itemId])
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
