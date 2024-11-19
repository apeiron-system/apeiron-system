<?php

namespace App\Services;

use App\Models\ItemModel;
use App\Models\ItemPriceModel;
use App\Models\ContractModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ItemService
{
    public function getContracts()
    {
        return ContractModel::all();
    }

    public function getItemsForContract(Request $request, $contractId)
    {
        $query = ItemModel::where('contract_id', $contractId)
            ->with(['prices', 'bids']); // Eager load prices and bids
    
        // Apply filters like search or sorting here if needed
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('description', 'like', '%' . $request->search . '%')
                    ->orWhere('type', 'like', '%' . $request->search . '%');
            });
        }
    
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
            $query->orderBy('created_at', 'desc');
        }
    
        return $query->paginate(10);
    }
    

    public function storeItems($contractId, $items)
    {

        Log::info($items);
        foreach ($items as $item) {
            $existingItem = ItemModel::where('contract_id', $contractId)
                ->where('description', $item['description'])
                ->first();

            if ($existingItem) {
                continue;
            }

            $itemModel = new ItemModel();
            $itemModel->contract_id = $contractId;
            $itemModel->description = $item['description'];
            $itemModel->type = $item['type'];
            $itemModel->unit = $item['unit'];
            $itemModel->save();

            $priceModel = new ItemPriceModel();
            $priceModel->unit_cost = $item['unit_cost'];
            $priceModel->is_current = true;
            $priceModel->item_id = $itemModel->id;
            $priceModel->save();
        }
    }

    public function updateItem($contractId, $id, $data)
    {
        $item = ItemModel::where('id', $id)->where('contract_id', $contractId)->firstOrFail();

        $item->description = $data['description'];
        $item->type = $data['type'];
        $item->unit = $data['unit'];

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
    }

    public function deleteItems($ids)
    {
        foreach ($ids as $id) {
            $item = ItemModel::findOrFail($id);
            $item->delete();
        }
    }

    public function getItemWithPrices($contractId, $id)
    {
        return ItemModel::with(['prices' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->where('contract_id', $contractId)->findOrFail($id);
    }

    //update price for the item
    public function updateItemPrice($contractId, $itemId, $newPrice)
    {
        // Find the item by its ID and contract_id
        $item = ItemModel::where('id', $itemId)
            ->where('contract_id', $contractId)
            ->firstOrFail();

        // Get the latest price
        $latestPrice = $item->prices()->where('is_current', true)->first();

        // If the new price is different, create a new price entry
        if ($latestPrice->unit_cost != $newPrice) {
            // Mark the old price as not current
            $latestPrice->is_current = false;
            $latestPrice->save();

            // Save the new price as current
            $priceModel = new ItemPriceModel();
            $priceModel->unit_cost = $newPrice;
            $priceModel->is_current = true;
            $priceModel->item_id = $item->id;
            $priceModel->save();
        }
    }

}
