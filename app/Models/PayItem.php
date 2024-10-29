<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PayItem extends Model
{
    protected $fillable = [
        'project_contract_id',
        'item_no',
        'description',
        'unit',
        'qty',
        'unit_cost',
        'amount'
    ];

    public function projectContract(): BelongsTo
    {
        return $this->belongsTo(ProjectContract::class);
    }
}