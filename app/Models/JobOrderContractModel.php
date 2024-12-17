<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobOrderContractModel extends Model
{
    protected $table = 'contract';

    protected $fillable = [
        'description',
        'status',
        'contract_name',
        'location',
        'designation',
        'duration_in_days',
        'amount',
        'date',
        'submitted_by_employee_id',
        'signing_authority_employee_id',
        'authorized_representative_employee_id',
    ];

    /**
     * Scope to filter ongoing or pending contracts.
     */
    public function scopeActive($query)
    {
        return $query->whereIn('status', ['ongoing', 'pending']);
    }

    /**
     * Scope to filter completed or canceled contracts.
     */
    public function scopePast($query)
    {
        return $query->whereIn('status', ['completed', 'canceled']);
    }

    /**
     * Relationship with JobOrderProjectModel.
     */
    public function projects(): HasMany
    {
        return $this->hasMany(JobOrderProjectModel::class, 'contract_id');
    }
}
