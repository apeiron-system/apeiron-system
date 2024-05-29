<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'contract_name',
        'location',
        'designation',
        'date_signed',
        'submitted_by',
        'signing_authority',
        'authorized_representative',
    ];


    //CHILDREN:
    //(Contract has many) Job Orders
    public function jobOrders()
    {
        return $this->hasMany(JobOrder::class, 'jo_contract_id', 'contract_id');
    }

    //(Contract has many) Item Works
    public function itemWorks()
    {
        return $this->hasMany(ItemWork::class, 'iw_contract_id', 'contract_id');
    }
    
    //(Contract has many) Equipment Needed
    public function equipmentNeeded()
    {
        return $this->hasMany(EquipmentNeeded::class, 'en_contract_id', 'contract_id');
    }
}
