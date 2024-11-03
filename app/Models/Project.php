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

    protected $casts = [
        'unit_cost' => 'decimal:2',
        'budget' => 'decimal:2',
        'progress' => 'float',
        'qty' => 'integer',
        'item_no' => 'integer'
    ];

    /**
     * Get the contract that owns the project.
     */
    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }
}