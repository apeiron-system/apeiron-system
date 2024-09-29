<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeModel extends Model
{
    use HasFactory;

    protected $table = 'employee';


    //employee has many to many relationship with ProjectModel

    public function projects()
    {
        return $this->hasMany(ProjectModel::class, 'project_id');
    }

    public function contracts()
    {
        return $this->hasMany(ContractModel::class, 'project_id');
    }
}
