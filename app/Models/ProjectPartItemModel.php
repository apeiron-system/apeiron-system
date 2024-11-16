<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectPartItemModel extends Model
{
    use HasFactory;

    protected $table = 'project_part_items';

    protected $fillable = [
        'contract_id',
        'project_part_id',
        'item_id',
        'quantity',
    ];

    // Define relationships
    public function contract()
    {
        return $this->belongsTo(ContractModel::class, 'contract_id');
    }

    public function projectPart()
    {
        return $this->belongsTo(ProjectPartModel::class, 'project_part_id');
    }

    public function item()
    {
        return $this->belongsTo(ItemModel::class);
    }
}
