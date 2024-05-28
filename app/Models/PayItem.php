<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_modified',
        'description',
        'location',
        'unit',
        'unit_bid_cost',
    ];
    
}
