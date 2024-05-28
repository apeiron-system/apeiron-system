<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherDeductionsModel extends Model
{
    use HasFactory;

    protected $table = 'other_deductions';

    public function jobOrderProgressAccomplishment()
    {
        return $this->belongsTo(JobOrderProgressAccomplishmentModel::class, 'job_accomplishment_report_id', 'jo_pa_item_id');
    }
}
