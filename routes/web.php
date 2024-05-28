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

//PROGRESS BILLING MODULE
    //Create Job Order Page
        Route::get('/create-job-order', function () {
            return Inertia::render('JobOrder/CreateJobOrderPage');
        })->middleware(['auth', 'verified'])->name('create-job-order');

    //Job Order Contracts Page
        Route::get('/job-order-contracts', function () {
            return Inertia::render('JobOrder/JobOrderContractsPage');
        })->middleware(['auth', 'verified'])->name('job-order-contracts');
    
    //Job Order Details Page
        Route::get('/job-order-details', function () {
            return Inertia::render('JobOrder/JobOrderDetailsPage');
        })->middleware(['auth', 'verified'])->name('job-order-details');

    //Job Order Item Billing Page
        Route::get('/job-order-item-billing', function () {
            return Inertia::render('JobOrder/JobOrderItemBillingPage');
        })->middleware(['auth', 'verified'])->name('job-order-item-billing');

    //Job Order
        Route::get('/job-order', function () {
            return Inertia::render('JobOrder/JobOrderPage');
        })->middleware(['auth', 'verified'])->name('job-order');

    //Job Order
        Route::get('/job-order-projects', function () {
            return Inertia::render('JobOrder/JobOrderProjectsPage');
        })->middleware(['auth', 'verified'])->name('job-order-projects');

    

Route::get('/item', function () {
    return Inertia::render('Item/ItemPage');
})->middleware(['auth', 'verified'])->name('item');

Route::get('/progress-report', function () {
    return Inertia::render('ProgressReport/ProgressReportPage');
})->middleware(['auth', 'verified'])->name('progress-report');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
