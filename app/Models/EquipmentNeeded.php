<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentNeeded extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_name',
        'en_job_order_id',
        'en_contract_id',
    ];

    protected $primaryKey = 'equipment_id';

    //PARENT: (EquipmentNeeded belongs to) Job Order
    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class, 'en_job_order_id', 'job_order_id');
    }

    //PARENT: (EquipmentNeeded belongs to) Job Order
    public function contract()
    {
        return $this->belongsTo(Contract::class, 'en_contract_id', 'contract_id');
    }
}
