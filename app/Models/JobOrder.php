<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_order_no',
        'location',
        'period_covered',
        'supplier',
        'date_needed',
        'prepared_by',
        'checked_by',
        'approved_by',
        'piece_work_subcontractor',
        'grand_total',
        'jo_contract_id',
    ];


    //PARENT: (Job Order belongs to) Contract
    public function contract()
    {
        return $this->belongsTo(Contract::class, 'jo_contract_id', 'contract_id');
    }
    

    //CHILDREN:
    //(Job Order has many) Item Works
    public function itemWorks()
    {
        return $this->hasMany(ItemWorks::class, 'iw_contract_id', 'contract_id');
    }

    //(Job Order has many) Equipment Needed
    public function equipmentNeeded()
    {
        return $this->hasMany(EquipmentNeeded::class, 'en_job_order_id', 'job_order_id');
    }

    //(Job Order has many) Job Order Parts
    public function jobOrderParts()
    {
        return $this->hasMany(JobOrderPart::class, 'part_job_order_id', 'job_order_id');
    }

    //(Job Order has many) Job Order Pay Items
    public function jobOrderPayitems()
    {
        return $this->hasMany(JobOrderPayitem::class, 'pi_job_order_id', 'job_order_id');
    }
}
