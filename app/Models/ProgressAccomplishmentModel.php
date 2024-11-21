<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressAccomplishmentModel extends Model
{
    use HasFactory;

    protected $table = 'progress_accomplishment';

    protected $fillable = [
        'accomplishment_date', // Add this field
        'checked_by_employee_id',
        'reviewed_by_employee_id',
        'approved_by_employee_id',
        'prepared_by_employee_id',
        'contract_id',
        'project_id', // Add this field
    ];

    public function payItemJobOrderProgressAccomplishment()
    {
        return $this->hasMany(PayItemJobOrderProgressAccomplishmentModel::class, 'job_accomplishment_report_id', 'jo_pa_item_id');
    }

    public function project()
    {
        return $this->belongsTo(ProjectModel::class, 'project_id');
    }
}
