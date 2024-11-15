<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOrder extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'job_orders';

    // Define the primary key if it's not 'id'
    protected $primaryKey = 'jo_no';

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'jo_name', 
        'contract_id', 
        'project_id', 
        'location', 
        'period_covered', 
        'supplier', 
        'dateNeeded', 
        'preparedBy', 
        'checkedBy', 
        'approvedBy', 
        'itemWorks',
        'progress',
        'status',
    ];

    // Specify the date format if needed
    protected $dateFormat = 'Y-m-d H:i:s';

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
}
