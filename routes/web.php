<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectPartController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ContractItemController;
use App\Http\Controllers\ProjectPartItemController;
use App\Http\Controllers\BOQController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/job-order', function () {
    return Inertia::render('JobOrder/JobOrderPage');
})->middleware(['auth', 'verified'])->name('job-order');

Route::get('/progress-report', function () {
    return Inertia::render('ProgressReport/ProgressReportPage');
})->middleware(['auth', 'verified'])->name('progress-report');

//contract


Route::get("/contract", [ContractController::class, 'view'])->middleware(['auth', 'verified'])->name('contract');

Route::get("/contract/{id}", [ContractController::class, 'viewContract'])->middleware(['auth', 'verified'])->name('contract.view');

Route::get("/contract/add/contract", [ContractController::class, 'add'])->middleware(['auth', 'verified'])->name('contract.add');

Route::get("/contract/{id}/edit", [ContractController::class, 'edit'])->middleware(['auth', 'verified'])->name('contract.edit');

Route::post("/contract/add", [ContractController::class, 'create'])->middleware(['auth', 'verified'])->name('contract.create');

Route::patch("/contract/{id}/update", [ContractController::class, 'update'])->middleware(['auth', 'verified'])->name('contract.update');

Route::delete("/contract/{id}/delete", [ContractController::class, 'delete'])->middleware(['auth', 'verified'])->name('contract.delete');


//project

Route::get("/contract/{id}/project/add", [ProjectController::class, 'add'])->middleware(['auth', 'verified'])->name('contract.project.add');

Route::post("/contract/{contract_id}/project/add", [ProjectController::class, 'create'])->middleware(['auth', 'verified'])->name('contract.project.create');

Route::get("/contract/{contract_id}/project/{project_id}/edit", [ProjectController::class, 'edit'])->middleware(['auth', 'verified'])->name('contract.project.edit');

Route::delete("/contract/{contract_id}/project/{project_id}/delete", [ProjectController::class, 'delete'])->middleware(['auth', 'verified'])->name('contract.project.delete');

Route::get("/contract/{contract_id}/project/{project_id}", [ProjectController::class, 'view'])->middleware(['auth', 'verified'])->name('contract.project.view');

Route::patch("/contract/{contract_id}/project/{project_id}/update", [ProjectController::class, 'update'])->middleware(['auth', 'verified'])->name('contract.project.update');


//employees

Route::get('/employees', [EmployeeController::class, 'view'])->middleware(['auth', 'verified'])->name('employees');

Route::get('/employees/add', function () {
    return Inertia::render('Employee/AddEmployeePage');
})->middleware(['auth', 'verified'])->name('employee.add');

Route::get('/employees/edit/{id}', [EmployeeController::class, 'edit'])->middleware(['auth', 'verified'])->name('employees.edit');

Route::post('/employees/add', [EmployeeController::class, 'create'])->middleware(['auth', 'verified'])->name('employees.create');

Route::patch('/employees/{id}/update', [EmployeeController::class, 'update'])->middleware(['auth', 'verified'])->name('employees.update');

Route::delete('/employees/delete/{id}', [EmployeeController::class, 'delete'])->middleware(['auth', 'verified'])->name('employees.delete');

//contract

Route::get("/contract", [ContractController::class, 'view'])->middleware(['auth', 'verified'])->name('contract');

Route::get("/contract/{id}", [ContractController::class, 'viewContract'])->middleware(['auth', 'verified'])->name('contract.view');

Route::get("/contract/add/contract", [ContractController::class, 'add'])->middleware(['auth', 'verified'])->name('contract.add');

Route::get("/contract/{id}/edit", [ContractController::class, 'edit'])->middleware(['auth', 'verified'])->name('contract.edit');

Route::post("/contract/add", [ContractController::class, 'create'])->middleware(['auth', 'verified'])->name('contract.create');

Route::patch("/contract/{id}/update", [ContractController::class, 'update'])->middleware(['auth', 'verified'])->name('contract.update');

Route::delete("/contract/{id}/delete", [ContractController::class, 'delete'])->middleware(['auth', 'verified'])->name('contract.delete');

//contract item

Route::get('/contracts/{contractId}/items', [ContractItemController::class, 'showItemsForContract'])->name('contract.items');

Route::get('/contracts/{contractId}/items/{itemId}/bid', [ContractItemController::class, 'showBidPage'])->name('contract.item.bid');

Route::post('/contracts/{contractId}/items/{itemId}/bid', [ContractItemController::class, 'storeBid'])->name('item.contract.bid.store');

Route::delete('/contracts/{contractId}/items/{itemId}/bids', [ContractItemController::class, 'deleteBids'])
    ->name('item.contract.bids.delete');


//project
    
Route::get("/contract/{id}/project/add", [ProjectController::class, 'add'])->middleware(['auth', 'verified'])->name('contract.project.add');

Route::post("/contract/{contract_id}/project/add", [ProjectController::class, 'create'])->middleware(['auth', 'verified'])->name('contract.project.create');

Route::get("/contract/{contract_id}/project/{project_id}/edit", [ProjectController::class, 'edit'])->middleware(['auth', 'verified'])->name('contract.project.edit');

Route::delete("/contract/{contract_id}/project/{project_id}/delete", [ProjectController::class, 'delete'])->middleware(['auth', 'verified'])->name('contract.project.delete');

Route::get("/contract/{contract_id}/project/{project_id}", [ProjectController::class, 'view'])->middleware(['auth', 'verified'])->name('contract.project.view');

Route::patch("/contract/{contract_id}/project/{project_id}/update", [ProjectController::class, 'update'])->middleware(['auth', 'verified'])->name('contract.project.update');


//project-part

Route::get("/contract/{contract_id}/project/{project_id}/part/add", [ProjectPartController::class, 'add'])->middleware(['auth', 'verified'])->name('contract.project.part.add');

Route::post("/contract/{contract_id}/project/{project_id}/part/add", [ProjectPartController::class, 'create'])->middleware(['auth', 'verified'])->name('contract.project.part.create');

Route::get("/contract/{contract_id}/project/{project_id}/part/{part_id}/edit", [ProjectPartController::class, 'edit'])->middleware(['auth', 'verified'])->name('contract.project.part.edit');

Route::patch("/contract/{contract_id}/project/{project_id}/part/{part_id}/update", [ProjectPartController::class, 'update'])->middleware(['auth', 'verified'])->name('contract.project.part.update');

Route::delete("/contract/{contract_id}/project/{project_id}/part/{part_id}/delete", [ProjectPartController::class, 'delete'])->middleware(['auth', 'verified'])->name('contract.project.part.delete');


//project-part-item     
Route::get('contract/{contract_id}/project/{project_id}/part/{id}', [ProjectPartItemController::class, 'view'])->middleware(['auth', 'verified'])->name('contract.project.part.view');

Route::get('/contract/{contract_id}/project/{project_id}/part/{project_part_id}/item', [ProjectPartItemController::class, 'getContractItems'])->name('contract.project.part.item.add')->middleware(['auth', 'verified']);

Route::post('/contract/{contract_id}/project/{project_id}/part/{project_part_id}/item/add', [ProjectPartItemController::class, 'storeProjectPartItem'])->name('contract.project.part.item.store')->middleware(['auth', 'verified']);

Route::delete('/contract/{contract_id}/project/{project_id}/part/{project_part_id}/item/{item_id}/delete', [ProjectPartItemController::class, 'destroy'])->name('contract.project.part.item.delete')->middleware(['auth', 'verified']);

//BOQ

Route::get('/contract/{contractId}/project/{projectId}/boq', [BOQController::class, 'view'])->middleware(['auth', 'verified'])->name('boq.view');

Route::get('/contract/{contractId}/project/{projectId}/boq/download', [BOQController::class, 'download'])->middleware(['auth', 'verified'])->name('boq.download');


//profile

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get("/item", [ItemController::class, 'index'])->name('item');

Route::prefix('item')->group(function () {
    Route::get('/contracts/{contract}', [ItemController::class, 'contractIndex'])->name('item.contract'); // List items
    Route::get('/contracts/{contract}/create', [ItemController::class, 'create'])->name('item.contract.create'); // Show create form
    Route::post('/contracts/{contract}', [ItemController::class, 'store'])->name('item.contract.store'); // Store new item
    Route::get('/contracts/{contract}/{item}', [ItemController::class, 'show'])->name('item.contract.show'); // Show single item (if needed)
    Route::get('/contracts/{contract}/{item}/edit', [ItemController::class, 'edit'])->name('item.contract.edit'); // Show edit form
    Route::post('/contracts/{contract}/{item}', [ItemController::class, 'update'])->name('item.contract.update'); // Update item
    Route::post('/contracts/{contract}/item/delete', [ItemController::class, 'destroy'])->name('item.contract.destroy'); // Delete item
});






require __DIR__ . '/auth.php';
