<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemPriceModel extends Model
{
    use HasFactory;

    protected $table = 'item_prices';

    //add defaults

    protected $attributes = [
        'is_current' => 0,
        "unit_cost" => 0
    ];

    protected $fillable = [
        'item_id',
        'unit_cost',
        'is_current',
    ];

    public function item()
    {
        return $this->belongsTo(ItemModel::class, 'item_id');
    }
}
