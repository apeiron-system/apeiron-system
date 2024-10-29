<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    // Fillable attributes for mass assignment
    protected $fillable = [
        'project_contract_id',
        'name',
        'description',
        'start_date',
        'end_date',
        'budget',
        'progress',
        'status',
    ];

    public function projectContract(): BelongsTo
    {
        return $this->belongsTo(ProjectContract::class, 'project_contract_id');
    }
}
