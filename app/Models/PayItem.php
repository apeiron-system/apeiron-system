<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayItem extends Model
{
    protected $fillable = [
        'item_no',
        'description',
        'unit',
        'qty',
        'unit_cost',
        'amount'
    ];
}