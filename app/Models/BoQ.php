<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BoQ extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'boq';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'jo_no',
        'boq_part_id',
    ];

    /**
     * Get the job order associated with this BOQ.
     */
    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class, 'jo_no', 'jo_no');
    }

    /**
     * Get the BOQ part associated with this BOQ.
     */
    public function boqPart(): HasMany
    {
        return $this->hasMany(BoqPart::class, 'boq_part_id');
    }
}
