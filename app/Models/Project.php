<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'contract_id',
        'item_no',
        'description',
        'unit',
        'qty',
        'unit_cost',
        'budget',
        'progress',
        'status'
    ];

    /**
     * Get the contract that owns the project.
     */
    public function contract()
    {
        return $this->belongsTo(Contract::class, 'contract_id');
    }
}