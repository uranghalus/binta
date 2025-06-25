<?php

use App\Http\Controllers\AparController;
use App\Http\Controllers\AparInspectionController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\HydrantController;
use App\Http\Controllers\HydrantInspectionController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\OfficesController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create'])
    ->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::prefix('role-management')->group(function () {
        Route::resource('permission-list', PermissionController::class)
            ->parameters(['permission' => 'id'])
            ->names('permission');
    });
    Route::prefix('fire-safety')->group(function () {
        Route::resource('apar', AparController::class)
            ->parameters(['apar' => 'id'])
            ->names('apar');
        Route::resource('hydrant', HydrantController::class)
            ->parameters(['hydrant' => 'id'])
            ->names('hydrant');
    });
    Route::prefix('inspection')->group(function () {
        Route::resource('apar', AparInspectionController::class)
            ->parameters(['apar' => 'id'])
            ->names('inspection.apar');
        Route::resource('hydrant', HydrantInspectionController::class)
            ->parameters(['hydrant' => 'id'])
            ->names('inspection.hydrant');

        Route::get('apar-inspeksi/{id}', [InspectionController::class, 'aparinspeksi'])->name('apar.inspection');
        Route::get('hydrant-inspeksi/{id}', [InspectionController::class, 'hydrantinspeksi'])->name('hydrant.inspection');
        Route::get('scan', function () {
            return Inertia::render('inspection/react-scan');
        })->name('apar.scan');
    });

    Route::get('/hydrant/qrcode/{id}', [HydrantController::class, 'HydrantQRCode'])->name('hydrant.qrcode');
    Route::get('/hydrant/print-qrcode', [HydrantController::class, 'MassHydrantQRCode'])->name('hydrant.print-qrcode');
    Route::get('/apar/qrcode/{id}', [AparController::class, 'generateQRCode'])->name('apar.qrcode');
    Route::get('/apar/print-qrcode', [AparController::class, 'generateMassQRCode'])->name('apar.print-qrcode');
    Route::prefix('master-data')->group(function () {
        Route::resource('unit-bisnis', OfficesController::class)->parameters(['unit-bisnis
        ' => 'id'])
            ->names('unit-bisnis');
        Route::resource('departemen', DepartmentController::class)
            ->parameters(['departemen' => 'id'])
            ->names('departemen');
        Route::resource('jabatan', JabatanController::class)
            ->parameters(['jabatan' => 'id'])
            ->names('jabatan');
        Route::resource('karyawan', KaryawanController::class)
            ->parameters(['karyawan' => 'id'])
            ->names('karyawan');
        Route::resource('role', RoleController::class)->parameters(['role' => 'id'])->names('role');
    });
});
Route::get('/captcha', function () {
    return response()->json([
        'captcha' => captcha_src('default'),
    ]);
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
