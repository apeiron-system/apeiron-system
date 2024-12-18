<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ContractModel extends Model
{
    use HasFactory;

    protected $table = 'contract';

    public function signingAuthorityEmployee()
    {
        return $this->belongsTo(EmployeeModel::class, 'authorized_representative_employee_id');
    }

    public function projects()
    {
        return $this->hasMany(ProjectModel::class, 'contract_id');
    }

    //added item relation for contract
    public function items()
    {
        return $this->hasMany(ItemModel::class, 'contract_id');
    }

}
