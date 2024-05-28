<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
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

Route::get('/item', function () {
    return Inertia::render('Item/ItemPage');
})->middleware(['auth', 'verified'])->name('item');

Route::get('/progress-report', function () {
    return Inertia::render('ProgressReport/ProgressReportPage');
})->middleware(['auth', 'verified'])->name('progress-report');



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

//project
Route::get("/contract/{id}/project/add", [ProjectController::class, 'add'])->middleware(['auth', 'verified'])->name('contract.project.add');

Route::post("/contract/{contract_id}/project/add", [ProjectController::class, 'create'])->middleware(['auth', 'verified'])->name('contract.project.create');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
