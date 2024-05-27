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
}
