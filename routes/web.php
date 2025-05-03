<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
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
        Route::resource('unit-bisnis', OfficesController::class);
    });
});
Route::get('/captcha', function () {
    return response()->json([
        'captcha' => captcha_src('default'),
    ]);
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
