<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemWork extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_works',
        'iw_job_order_id',
        'iw_contract_id',
    ];

    
    //PARENT: (ItemWork belongs to) Job Order
    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class, 'iw_job_order_id', 'job_order_id');
    }

    //PARENT: (ItemWork belongs to) Contract
    public function contract()
    {
        return $this->belongsTo(Contract::class, 'iw_contract_id', 'contract_id');
    }
}
