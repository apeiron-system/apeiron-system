<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\JobOrderController;
use App\Http\Controllers\JobOrderDetailsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome/Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Contract
    Route::get('/contract', function () {
        return Inertia::render('Contract/ContractPage');
    })->name('contract');

    // Job Order Contracts
    Route::get('/job-order-contracts', [ContractController::class, 'index'])
        ->name('job-order-contracts');

    // Job Order Projects
    Route::get('/job-order-projects', [ProjectController::class, 'index'])
        ->name('job-order-projects');

    // Job Order
    Route::get('/job-order', [JobOrderController::class, 'index'])
        ->name('job-order');

    // Create Job Order
    Route::get('/create-job-order', [JobOrderController::class, 'create'])
        ->name('create-job-order');

    // Store Job Order
    Route::post('/store-job-order', [JobOrderController::class, 'store'])
        ->name('store-job-order');

    // Job Order Details
    Route::get('/job-order-details', [JobOrderDetailsController::class, 'index'])
        ->name('job-order-details');

    // Delete Job Order
    Route::delete('/job-order-details', [JobOrderDetailsController::class, 'destroy'])
        ->name('job-order-details');
    
    // Job Order Item Billing
    Route::get('/job-order-item-billing', function () {
        return Inertia::render('JobOrder/JobOrderItemBillingPage');
    })->name('job-order-item-billing');

    // Item Management
    Route::get('/item', function () {
        return Inertia::render('Item/ItemPage');
    })->name('item');

    // Progress Report
    Route::get('/progress-report', function () {
        return Inertia::render('ProgressReport/ProgressReportPage');
    })->name('progress-report');

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';