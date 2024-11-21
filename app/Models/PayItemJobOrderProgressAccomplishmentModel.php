<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PayItemJobOrderProgressAccomplishmentModel extends Model
{
    use HasFactory;

    protected $table = 'pay_item_job_order_progress_accomplishment';

    public function jobOrderProgressAccomplishment()
    {
        return $this->belongsTo(JobOrderProgressAccomplishmentModel::class, 'job_accomplishment_report_id', 'jo_pa_item_id');
    }
}
