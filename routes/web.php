<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectContractController;
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
    Route::get('/job-order-projects', [ProjectContractController::class, 'index'])
        ->name('job-order-projects');

    // Job Order Details
    Route::get('/job-order-details', function () {
        return Inertia::render('JobOrder/JobOrderDetailsPage');
    })->name('job-order-details');

    // Create Job Order
    Route::get('/create-job-order', function () {
        return Inertia::render('JobOrder/CreateJobOrderPage');
    })->name('create-job-order');

    // Job Order Item Billing
    Route::get('/job-order-item-billing', function () {
        return Inertia::render('JobOrder/JobOrderItemBillingPage');
    })->name('job-order-item-billing');

    // Job Order
    Route::get('/job-order', function () {
        return Inertia::render('JobOrder/JobOrderPage');
    })->name('job-order');

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