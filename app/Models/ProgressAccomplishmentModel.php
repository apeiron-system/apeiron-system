<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressAccomplishmentModel extends Model
{
    use HasFactory;

    protected $table = 'progress_accomplishment';

    public function payItemJobOrderProgressAccomplishment()
    {
        return $this->hasMany(PayItemJobOrderProgressAccomplishmentModel::class, 'job_accomplishment_report_id', 'jo_pa_item_id');
    }
}
