<?php

namespace App\Enums;

enum PermissionsEnum: string {
    case CONTRACT_MANAGEMENT = 'contract_management';
    case EMPLOYEE_MANAGEMENT = 'employee_management';
    case JOB_ORDER_MANAGEMENT = 'job_order_management';
    case ITEM_MANAGEMENT = 'item_management';
    case PROGRESS_REPORT_MANAGEMENT = 'progress_report_management';
}
