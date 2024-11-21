<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOrderProgressAccomplishmentModel extends Model
{
    use HasFactory;

    protected $table = 'job_order_progress_accomplishment';

    public function payItemJobOrderProgressAccomplishment()
    {
        return $this->hasMany(PayItemJobOrderProgressAccomplishmentModel::class, 'job_accomplishment_report_id', 'jo_pa_item_id');
    }

    public function otherDeductions()
    {
        return $this->hasMany(OtherDeductionsModel::class, 'job_accomplishment_report_id', 'jo_pa_item_id');
    }
}
