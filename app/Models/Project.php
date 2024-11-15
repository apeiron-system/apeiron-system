<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'description',
        'progress',
        'status',
        'location',
    ];

    /**
     * Get the contract that owns the project.
     */
    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class, 'contract_id');
    }

    public function jobOrder(): HasMany
    {
        return $this->hasMany(JobOrder::class, 'project_id');
    }
}