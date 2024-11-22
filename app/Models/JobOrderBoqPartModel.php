<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOrderBoqPartModel extends Model
{
    protected $table = 'boq_part';

    // Primary key
    protected $primaryKey = 'boq_part_id';

    // Fillable properties for mass assignment
    protected $fillable = [
        'boq_id',
        'part_name',
        'item_no',
        'description',
        'unit',
        'quantity',
        'unit_cost',
        'amount',
        'subtotal',
        'weight',
    ];

    // Relationships
    public function boq()
    {
        return $this->belongsTo(JobOrderBoqModel::class, 'boq_id', 'boq_id'); // Foreign key 'boq_id' relates to 'boq' table
    }
}
