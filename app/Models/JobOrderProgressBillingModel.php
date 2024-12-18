<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOrderProgressBillingModel extends Model
{
    use HasFactory;

    protected $table = 'progress_billing';

    protected $primaryKey = 'bill_num';

    public $incrementing = true; // Primary key is auto-incrementing

    protected $fillable = [
        'jo_no',
        'project_id',
        'pb_name',
        'start_date',
        'end_date',
    ];

    // Relationships
    public function jobOrder()
    {
        return $this->belongsTo(JobOrderModel::class, 'jo_no', 'id');
    }

    public function project()
    {
        return $this->belongsTo(ProjectModel::class, 'project_id', 'id');
    }
}
