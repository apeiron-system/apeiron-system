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


}
