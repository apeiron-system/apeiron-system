<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ContractModel;
use App\Models\ItemPriceModel;

class ItemModel extends Model
{
    use HasFactory;

    protected $table = 'items';

    protected $attributes = [
        'description' => '',
        'type' => 'material',
        'unit' => '',
    ];

    protected $fillable = [
        'contract_id',
        'description',
        'type',
        'unit',
    ];

    public function contract()
    {
        return $this->belongsTo(ContractModel::class, 'contract_id');
    }

    public function prices()
    {
        return $this->hasMany(ItemPriceModel::class, 'item_id');
    }

    public function getLatestPrice()
    {
        return $this->prices()->latest()->first();
    }

    // Sort by latest
    public function getAllPrices()
    {
        return $this->prices()->orderBy('created_at', 'desc')->get();
    }

    // Adds a new item price
    public function addItemPrice(array $data)
    {
        return $this->prices()->create($data);
    }

    // Edit the model
    public function editItem(array $data)
    {
        return $this->update($data);
    }

    // Add a batch of items with their prices
    public function addItemBatch(array $itemsData)
    {
        $createdItems = [];

        foreach ($itemsData as $itemData) {
            // Create the item
            $item = self::create($itemData['item']);

            // If prices are provided, create them as well
            if (isset($itemData['prices'])) {
                foreach ($itemData['prices'] as $priceData) {
                    $item->prices()->create($priceData);
                }
            }

            $createdItems[] = $item;
        }

        return $createdItems;
    }

    // Delete a batch of item prices
    public function deleteItemBatch(array $priceIds)
    {
        return $this->prices()->whereIn('id', $priceIds)->delete();
    }

    // Adds a single item with optional prices
    public function addItem(array $itemData, array $prices = [])
    {
        // Create the item
        $item = self::create($itemData);

        // If prices are provided, create them as well
        if (!empty($prices)) {
            foreach ($prices as $priceData) {
                $item->prices()->create($priceData);
            }
        }

        return $item;
    }

    // Deletes an item by ID, with an option to delete associated prices
    public function deleteItem($id, $deletePrices = false)
    {
        $item = self::find($id);

        if ($item) {
            if ($deletePrices) {
                $item->prices()->delete(); // Delete associated prices
            }

            return $item->delete(); // Delete the item
        }

        return false; // Item not found
    }
}
