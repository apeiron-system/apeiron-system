<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOrderPayItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_order_no',
        'job_order_part',
        'equipment_name',
        'pi_job_order_id',
        'pi_jo_part_id',
    ];

    
    //PARENT: (Job Order Pay Item belongs to) Job Order
    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class, 'pi_job_order_id', 'job_order_id');
    }

    //PARENT: (Job Order Pay Item belongs to) Job Order Part
    public function jobOrderPart()
    {
        return $this->belongsTo(JobOrderPart::class, 'pi_jo_part_id', 'part_id');
    }
}
