<?php

use App\Http\Controllers\AparController;
use App\Http\Controllers\AparInspectionController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\OfficesController;
use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create'])
    ->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::prefix('role-management')->group(function () {
        Route::resource('permission-list', PermissionController::class)
            ->parameters(['permission' => 'id'])
            ->names('permission');
    });
    Route::prefix('fire-safety')->group(function () {
        Route::resource('apar', AparController::class)
            ->parameters(['apar' => 'id'])
            ->names('apar');
    });
    Route::prefix('inspection')->group(function () {
        Route::resource('apar', AparInspectionController::class)
            ->parameters(['apar' => 'id'])
            ->names('inspection.apar');
    });
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
    });
});
Route::get('/captcha', function () {
    return response()->json([
        'captcha' => captcha_src('default'),
    ]);
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
