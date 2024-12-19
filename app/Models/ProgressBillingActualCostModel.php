<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressBillingActualCostModel extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pb_item_actual_cost';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'item_id',
        'actual_cost',
    ];

    /**
     * The relationship between PbItemActualCost and ProjectPartItem.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function projectPartItem()
    {
        return $this->belongsTo(ProjectPartItemModel::class, 'item_id');
    }
}