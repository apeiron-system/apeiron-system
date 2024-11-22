<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobOrderBoqModel extends Model
{
    protected $table = 'boq';

    protected $primaryKey = 'boq_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'jo_no',
    ];

    /**
     * Get the job order associated with this BOQ.
     */
    public function jobOrders()
    {
        return $this->belongsTo(JobOrderModel::class, 'jo_no');
    }

    /**
     * Get the BOQ part associated with this BOQ.
     */
    public function boqParts(): HasMany
    {
        return $this->hasMany(JobOrderBoqPartModel::class, 'boq_part_id');
    }
}
