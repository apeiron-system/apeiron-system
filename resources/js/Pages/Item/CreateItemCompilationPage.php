<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $table = 'items';
    protected $primaryKey = 'item_id';

    protected $fillable = [
        'item_name',
        'description',
        'unit_price',
        'quantity',
        'job_order_id',
        'project_id',
        'contract_id' 
    ];

    // Relationships
    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    // Accessor (for calculated attributes)
    public function getTotalCostAttribute()
    {
        return $this->unit_price * $this->quantity;
    }
}
