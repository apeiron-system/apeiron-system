<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
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

Route::get('/contract', function () {
    return Inertia::render('Contract/ContractPage');
})->middleware(['auth', 'verified'])->name('contract');

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

Route::get('/employees/edit/{id}', [EmployeeController::class, 'edit'])->middleware(['auth', 'verified'])->name('employee.edit');

Route::post('/employees/add', [EmployeeController::class, 'create'])->middleware(['auth', 'verified'])->name('employee.create');

Route::patch('/employees/{id}/update', [EmployeeController::class, 'update'])->middleware(['auth', 'verified'])->name('employee.update');

Route::delete('/employees/delete/{id}', [EmployeeController::class, 'delete'])->middleware(['auth', 'verified'])->name('employee.delete');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
