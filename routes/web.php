<?php

use App\Enums\PermissionsEnum;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressReportController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectPartController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ContractItemController;
use App\Http\Controllers\ProjectPartItemController;
use App\Http\Controllers\BOQController;
use App\Http\Middleware\CheckPermission;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {


    // check if application has already a user. if yes, set canRegister to false
    $canRegister = User::count() === 0;

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => (Route::has('register') && $canRegister),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/job-order', function () {
    return Inertia::render('JobOrder/JobOrderPage');
})->middleware(['auth', 'verified'])->name('job-order');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//contract

Route::group(
    [
        'prefix' => 'contract',
        'middleware' => ['auth', 'verified', 'checkPermission' . ':' . PermissionsEnum::CONTRACT_MANAGEMENT->value],
    ],
    function () {
        Route::get('/', [ContractController::class, 'index'])->name('contract.index');
        Route::get('/create', [ContractController::class, 'create'])->name('contract.create');
        Route::post('/', [ContractController::class, 'store'])->name('contract.store');
        Route::get('/{contract}', [ContractController::class, 'show'])->name('contract.show');
        Route::get('/{contract}/edit', [ContractController::class, 'edit'])->name('contract.edit');
        Route::put('/{contract}', [ContractController::class, 'update'])->name('contract.update');
        Route::delete('/{contract}', [ContractController::class, 'destroy'])->name('contract.destroy');

        Route::get("/{id}/project/add", [ProjectController::class, 'add'])->name('contract.project.add');

        Route::post("/{contract_id}/project/add", [ProjectController::class, 'create'])->name('contract.project.create');

        Route::get("/{contract_id}/project/{project_id}/edit", [ProjectController::class, 'edit'])->name('contract.project.edit');

        Route::delete("/{contract_id}/project/{project_id}/delete", [ProjectController::class, 'delete'])->name('contract.project.delete');

        Route::get("/{contract_id}/project/{project_id}", [ProjectController::class, 'view'])->name('contract.project.view');

        Route::patch("/{contract_id}/project/{project_id}/update", [ProjectController::class, 'update'])->name('contract.project.update');
    }
);

//employees

Route::middleware([
    'auth',
    'verified',
    'checkPermission' . ':' . PermissionsEnum::EMPLOYEE_MANAGEMENT->value
])->group(function () {
    Route::get('/employees', [EmployeeController::class, 'view'])->name('employees');

    Route::get('/employees/add', function () {
        return Inertia::render('Employee/AddEmployeePage');
    })->name('employee.add');

    Route::get('/employees/edit/{id}', [EmployeeController::class, 'edit'])->name('employees.edit');

    Route::post('/employees/add', [EmployeeController::class, 'create'])->name('employees.create');

    Route::patch('/employees/{id}/update', [EmployeeController::class, 'update'])->name('employees.update');

    Route::delete('/employees/delete/{id}', [EmployeeController::class, 'delete'])->name('employees.delete');

    Route::get('/employees/user-management/{id}', [EmployeeController::class, 'userManagement'])->name('employees.usermanagement');

    Route::put('/employees/user-management/{id}', [EmployeeController::class, 'updateUserManagement'])->name('employees.usermanagement.update');
});





//contract

Route::middleware([
    'auth',
    'verified',
    'checkPermission' . ':' . PermissionsEnum::CONTRACT_MANAGEMENT->value
])->group(function () {
    // Contract Routes
    Route::get("/contract", [ContractController::class, 'view'])->name('contract');
    Route::get("/contract/{id}", [ContractController::class, 'viewContract'])->name('contract.view');
    Route::get("/contract/add/contract", [ContractController::class, 'add'])->name('contract.add');
    Route::get("/contract/{id}/edit", [ContractController::class, 'edit'])->name('contract.edit');
    Route::post("/contract/add", [ContractController::class, 'create'])->name('contract.create');
    Route::patch("/contract/{id}/update", [ContractController::class, 'update'])->name('contract.update');
    Route::delete("/contract/{id}/delete", [ContractController::class, 'delete'])->name('contract.delete');

    // Contract Item Routes
    Route::get('/contracts/{contractId}/items', [ContractItemController::class, 'showItemsForContract'])->name('contract.items');
    Route::get('/contracts/{contractId}/items/{itemId}/bid', [ContractItemController::class, 'showBidPage'])->name('contract.item.bid');
    Route::post('/contracts/{contractId}/items/{itemId}/bid', [ContractItemController::class, 'storeBid'])->name('item.contract.bid.store');
    Route::delete('/contracts/{contractId}/items/{itemId}/bids', [ContractItemController::class, 'deleteBids'])->name('item.contract.bids.delete');

    // Project Routes
    Route::get("/contract/{id}/project/add", [ProjectController::class, 'add'])->name('contract.project.add');
    Route::post("/contract/{contract_id}/project/add", [ProjectController::class, 'create'])->name('contract.project.create');
    Route::get("/contract/{contract_id}/project/{project_id}/edit", [ProjectController::class, 'edit'])->name('contract.project.edit');
    Route::delete("/contract/{contract_id}/project/{project_id}/delete", [ProjectController::class, 'delete'])->name('contract.project.delete');
    Route::get("/contract/{contract_id}/project/{project_id}", [ProjectController::class, 'view'])->name('contract.project.view');
    Route::patch("/contract/{contract_id}/project/{project_id}/update", [ProjectController::class, 'update'])->name('contract.project.update');

    // Project Part Routes
    Route::get("/contract/{contract_id}/project/{project_id}/part/add", [ProjectPartController::class, 'add'])->name('contract.project.part.add');
    Route::post("/contract/{contract_id}/project/{project_id}/part/add", [ProjectPartController::class, 'create'])->name('contract.project.part.create');
    Route::get("/contract/{contract_id}/project/{project_id}/part/{part_id}/edit", [ProjectPartController::class, 'edit'])->name('contract.project.part.edit');
    Route::patch("/contract/{contract_id}/project/{project_id}/part/{part_id}/update", [ProjectPartController::class, 'update'])->name('contract.project.part.update');
    Route::delete("/contract/{contract_id}/project/{project_id}/part/{part_id}/delete", [ProjectPartController::class, 'delete'])->name('contract.project.part.delete');

    // Project Part Item Routes
    Route::get('contract/{contract_id}/project/{project_id}/part/{id}', [ProjectPartItemController::class, 'view'])->name('contract.project.part.view');
    Route::get('/contract/{contract_id}/project/{project_id}/part/{project_part_id}/item', [ProjectPartItemController::class, 'getContractItems'])->name('contract.project.part.item.add');
    Route::post('/contract/{contract_id}/project/{project_id}/part/{project_part_id}/item/add', [ProjectPartItemController::class, 'storeProjectPartItem'])->name('contract.project.part.item.store');
    Route::delete('/contract/{contract_id}/project/{project_id}/part/{project_part_id}/item/{item_id}/delete', [ProjectPartItemController::class, 'destroy'])->name('contract.project.part.item.delete');

    // BOQ Routes
    Route::get('/contract/{contractId}/project/{projectId}/boq', [BOQController::class, 'view'])->name('boq.view');
    Route::get('/contract/{contractId}/project/{projectId}/boq/download', [BOQController::class, 'download'])->name('boq.download');
});


//profile

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::middleware(
    [
        'auth',
        'verified',
        'checkPermission' . ':' . PermissionsEnum::ITEM_MANAGEMENT->value
    ]
)->group(function () {
    Route::get("/item", [ItemController::class, 'index'])->name('item'); // List items
    Route::get('/item/contracts/{contract}', [ItemController::class, 'contractIndex'])->name('item.contract'); // List items
    Route::get('/item/contracts/{contract}/create', [ItemController::class, 'create'])->name('item.contract.create'); // Show create form
    Route::post('/item/contracts/{contract}', [ItemController::class, 'store'])->name('item.contract.store'); // Store new item
    Route::get('/item/contracts/{contract}/{item}', [ItemController::class, 'show'])->name('item.contract.show'); // Show single item (if needed)
    Route::get('/item/contracts/{contract}/{item}/edit', [ItemController::class, 'edit'])->name('item.contract.edit'); // Show edit form
    Route::post('/item/contracts/{contract}/{item}', [ItemController::class, 'update'])->name('item.contract.update'); // Update item
    Route::post('/item/contracts/{contract}/item/delete', [ItemController::class, 'destroy'])->name('item.contract.destroy'); // Delete item
});


//Progress report Contracts Page
Route::middleware(['auth', 'verified',
    'checkPermission' . ':' . PermissionsEnum::PROGRESS_REPORT_MANAGEMENT->value
])->prefix('/progress-report')->group(function () {
    // Main Route
    Route::get('/', [ProgressReportController::class, 'index_contracts'])->name('progress-report');

    // Contract Routes
    Route::get('/contracts/{contractId}', [ProgressReportController::class, 'showContract'])->name('progress-report.contract');

    // Project Routes
    Route::get('/contracts/{contractId}/project/{projectId}', [ProgressReportController::class, 'showProject'])->name('progress-report.project');

    // Store a Progress Report for a Project
    Route::post('/contracts/{contractId}/project/{projectId}/add', [ProgressReportController::class, 'store']);

    // Show Progress Report Index (for Project)
    Route::get('/contracts/{contractId}/project/{projectId}/show', [ProgressReportController::class, 'index_par']);

    // Individual Report Routes
    Route::get('/contracts/{contractId}/project/{projectId}/report/{reportId}', [ProgressReportController::class, 'showProgressReport'])->name('progress-report.report');
    Route::post('/contracts/{contractId}/project/{projectId}/report/{reportId}/edit', [ProgressReportController::class, 'storeProgressReportItem'])->name('progress-report.item');

    // Accomplishments for a Report
    Route::get('/contracts/{contractId}/project/{projectId}/report/{reportId}/accomplishments', [ProgressReportController::class, 'getAccomplishments'])->name('progress-report.accomplishments');
});
require __DIR__ . '/auth.php';
