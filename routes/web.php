<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
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

Route::get('/par-details', function () {
    return Inertia::render('ProgressReport/ParDetailsPage');
})->middleware(['auth', 'verified'])->name('par-details');

Route::get('/par-contract-details', function () {
    return Inertia::render('ProgressReport/ParContractDetailsPage');
})->middleware(['auth', 'verified'])->name('par-contract-details');

Route::get('/employees', function () {
    return Inertia::render('Employee/EmployeePage');
})->middleware(['auth', 'verified'])->name('employees');

Route::get('/employees/add', function () {
    return Inertia::render('Employee/AddEmployeePage');
})->middleware(['auth', 'verified'])->name('employee.create');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
