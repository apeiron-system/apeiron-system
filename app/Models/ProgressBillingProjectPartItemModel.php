<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressBillingProjectPartItemModel extends Model
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
        'project_part_id',
        'item_id',
        'actual_cost',
    ];

    /**
     * The relationship between PbItemActualCost and ProjectPartItem.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function projectPartId()
    {
        return $this->belongsTo(ProjectPartItemModel::class, 'project_part_id');
    }

    public function itemId()
    {
        return $this->belongsTo(ProjectPartItemModel::class, 'item_id');
    }
}