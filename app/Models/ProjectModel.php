<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectModel extends Model
{
    use HasFactory;

    protected $table = "project";

    public function submittedByEmployee()
    {
        return $this->belongsTo(EmployeeModel::class, 'submitted_by_employee_id');
    }

    public function signingAuthorityEmployee()
    {
        return $this->belongsTo(EmployeeModel::class, 'signing_authority_employee_id');
    }

    public function contract()
    {
        return $this->belongsTo(ContractModel::class, 'contract_id');
    }

    public function projectParts()
    {
        return $this->hasMany(ProjectPartModel::class, 'project_id');
    }

    public function progressReports()
    {
        return $this->hasMany(ProgressAccomplishmentModel::class, 'project_id');
    }

}
