<?php

namespace App\Http\Controllers;

use App\Models\ItemModel;
use App\Models\ContractModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContractItemController extends Controller
{
    public function showItemsForContract($contractId)
    {
        // Eager-load items with their prices and signing Authority
        $contract = ContractModel::with(['items.prices', 'signingAuthorityEmployee'])->findOrFail($contractId);
        
        $items = $contract->items;

        return Inertia::render('Contract/ContractItem/ContractItemsPage', [
            'contract' => $contract,
            'items' => $items,
            'signingAuthorityEmployee' => $contract->signingAuthorityEmployee,
        ]);        
    }


}
