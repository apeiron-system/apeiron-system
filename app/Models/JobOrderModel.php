<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobOrderModel extends Model
{
    protected $table = 'job_orders';

    // Define the primary key
    protected $primaryKey = 'jo_no';

    // Ensure the primary key is not auto-incrementing if it's not numeric
    public $incrementing = false;

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'contract_id',
        'project_id',
        'project_desc',
        'contract_name',
        'jo_name',
        'location',
        'supplier',
        'itemWorks',
        'period_covered',
        'dateNeeded', 
        'preparedBy',
        'checkedBy',
        'approvedBy', 
        'budget',
        'status',
        'progress',
    ];

    // Specify the date format and casting
    protected $casts = [
        'dateNeeded' => 'datetime',  // Automatically cast to Carbon instance
    ];

    // Relationships

    // Belongs to Contract
    public function contract()
    {
        return $this->belongsTo(JobOrderContractModel::class, 'contract_id');
    }

    // Belongs to Project
    public function project()
    {
        return $this->belongsTo(JobOrderProjectModel::class, 'project_id');
    }

    // Has Many BOQs
    public function billingOfQuantities(): HasMany
    {
        return $this->hasMany(JobOrderBoqModel::class, 'jo_no');
    }
}
