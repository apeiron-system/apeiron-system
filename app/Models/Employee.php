<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    protected $table = 'employee';

    protected $fillable = [
        'name',
        'position',
        'department',
        'employee_id'
    ];

    // Relationships with ProjectContract
    public function submittedProjects(): HasMany
    {
        return $this->hasMany(ProjectContract::class, 'submitted_by_employee_id');
    }

    public function authorizedProjects(): HasMany
    {
        return $this->hasMany(ProjectContract::class, 'authorized_representative_employee_id');
    }

    public function signingAuthorityProjects(): HasMany
    {
        return $this->hasMany(ProjectContract::class, 'signing_authority_employee_id');
    }
}