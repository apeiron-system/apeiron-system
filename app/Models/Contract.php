<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contract extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'contract_name',
        'progress',
        'status'
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopePast($query)
    {
        return $query->where('status', 'past');
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'contract_id');
    }
}