<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoqPart extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'boq_part';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'part_name',
        'item_no',
        'description',
        'unit',
        'quantity',
        'unit_cost',
        'amount',
        'subtotal',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'unit_cost' => 'float',
        'amount' => 'float',
        'subtotal' => 'float',
    ];

    public function billingOfQuantities()
    {
        return $this->belongsTo(BoQ::class);
    }
    
    public function calculateAmount()
    {
        return $this->quantity * $this->unit_cost;
    }
}
