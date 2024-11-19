<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectPayItemModel extends Model
{
    use HasFactory;

    protected $table = 'project_pay_item';

    public function project()
    {
        return $this->belongsTo(ProjectModel::class, 'project_id');
    }


    public function projectPart()
    {
        return $this->belongsTo(ProjectPartModel::class, 'project_part_id');
    }

    public function payItem()
    {
        return $this->belongsTo(PayItemModel::class, 'pay_item_id');
    }



}
