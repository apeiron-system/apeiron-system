<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectPartModel extends Model
{
    use HasFactory;

    protected $table = 'project_part';


    // $table->foreignId("project_id");
    // $table->foreignId("parent_id")->nullable();

    // $table->foreign("project_id")->references("id")->on("project");
    // $table->foreign("parent_id")->references("id")->on("project_part");

    public function project()
    {
        return $this->belongsTo(ProjectModel::class, 'project_id');
    }

    public function parent()
    {
        return $this->belongsTo(ProjectPartModel::class, 'parent_id');
    }
}
