<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobOrderProjectModel extends Model
{
    // Define the table name
    protected $table = 'project';

    protected $primaryKey = 'project_id';

    // Define fillable fields based on the migration
    protected $fillable = [
        'project_name',
        'status',
        'street_address',
        'barangay',
        'city',
        'province',
        'zip_code',
        'country',
        'duration_in_days',
        'num_of_units',
        'abc_value',
        'submitted_by_employee_id',
        'signing_authority_employee_id',
        'contract_id',
    ];

    /**
     * Get the contract that owns the project.
     */
    public function contract(): BelongsTo
    {
        return $this->belongsTo(JobOrderContractModel::class, 'contract_id');
    }

    /**
     * Get the employee who submitted the project.
     */
    public function submittedBy(): BelongsTo
    {
        return $this->belongsTo(EmployeeModel::class, 'submitted_by_employee_id');
    }

    /**
     * Get the signing authority for the project.
     */
    public function signingAuthority(): BelongsTo
    {
        return $this->belongsTo(EmployeeModel::class, 'signing_authority_employee_id');
    }

    /**
     * Get the job orders associated with the project.
     */
    public function jobOrders(): HasMany
    {
        return $this->hasMany(JobOrderModel::class, 'project_id');
    }
}
