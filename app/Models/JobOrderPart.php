<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOrderPart extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_order_part',
        'description',
        'part_job_order_id',
    ];

    
    //PARENT: (Job Order Part belongs to) Job Order
    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class, 'part_job_order_id', 'job_order_id');
    }

    //CHILDREN:
    //(Job Order Part has many) Job Order Pay Items
    public function jobOrderPayitems()
    {
        return $this->hasMany(JobOrderPayitem::class, 'pi_jo_part_id', 'part_id');
    }
}
