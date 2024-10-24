<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;

    protected $fillable = ['contract_id', 'item_id', 'bid_amount'];

    // Relationship to Contract
    public function contract()
    {
        return $this->belongsTo(ContractModel::class);
    }

    // Relationship to Item
    public function item()
    {
        return $this->belongsTo(ItemModel::class);
    }

}

