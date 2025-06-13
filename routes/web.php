<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\OfficesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AuthenticatedSessionController::class, 'create'])
    ->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
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
