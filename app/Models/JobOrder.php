<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobOrder extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'job_orders';

    // Define the primary key if it's not 'id'
    protected $primaryKey = 'jo_no';

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

    // Specify the date format if needed
    protected $casts = [
        'dateNeeded' => 'datetime',  // Automatically cast to a Carbon instance
    ];

    // Define relationships (if any)

    // JobOrder belongs to a Contract
    public function contract()
    {
        return $this->belongsTo(Contract::class, 'contract_id');
    }

    // JobOrder belongs to a Project
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function billingOfQuantities(): HasMany
    {
        return $this->hasMany(BoQ::class, 'jo_no');
    }

    
}
