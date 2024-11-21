<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayItemProgressAccomplishmentModel extends Model
{
    use HasFactory;

    protected $table = 'pay_item_progress_accomplishment';

    protected $fillable = [
        'accomplishment_report_id',
        'contract_part_id',
        'pay_item_no',
        'quantity_this_period',
        'amount_this_period',
        'to_date_weight_percent',
        'balance_weight_percent',
        'remarks',
    ];

    public function jobOrderProgressAccomplishment()
    {
        return $this->belongsTo(JobOrderProgressAccomplishmentModel::class, 'job_accomplishment_report_id', 'jo_pa_item_id');
    }
}
