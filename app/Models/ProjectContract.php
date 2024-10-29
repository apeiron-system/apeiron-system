<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectContract extends Model
{
    protected $table = 'project_contract';
    
    protected $fillable = [
        'description',
        'contract_name',
        'location',
        'designation',
        'date',
        'submitted_by_employee_id',
        'signing_authority_employee_id',
        'authorized_representative_employee_id'
    ];

    protected $casts = [
        'date' => 'date'
    ];

    public function payItems(): HasMany
    {
        return $this->hasMany(PayItem::class);
    }

    public function submittedByEmployee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'submitted_by_employee_id');
    }

    public function signingAuthorityEmployee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'signing_authority_employee_id');
    }

    public function authorizedRepresentativeEmployee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'authorized_representative_employee_id');
    }
}