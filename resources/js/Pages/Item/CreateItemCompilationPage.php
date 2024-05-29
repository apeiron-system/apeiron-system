<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $table = 'items';  // Explicitly define the table name

    protected $primaryKey = 'item_id';

    protected $fillable = [
        'item_name',
        'description',
        'unit_price',
        'quantity',
        'job_order_id',
        'project_id',
        // ... any other relevant fields for item details
    ];

    // Relationships
    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class, 'job_order_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function contract()
    {
        return $this->belongsTo(Contract::class, 'contract_id');
    }

    // Additional Helper Methods (Optional)
    public function getTotalCostAttribute()
    {
        return $this->unit_price * $this->quantity;
    }
}
