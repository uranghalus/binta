<?php

use App\Http\Controllers\AparController;
use App\Http\Controllers\AparInspectionController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CekpointSecurityController;
use App\Http\Controllers\CPSecurityInspectionController;
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
use App\Http\Controllers\UserController;
use App\Models\CPInspection;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // LINK Role Management
    Route::prefix('role-management')->group(function () {
        Route::resource('permission-list', PermissionController::class)
            ->parameters(['permission' => 'id'])
            ->names('permission');
        Route::resource('role-list', RoleController::class)->parameters(['role' => 'id'])->names('role');
        // Bulk Delete
        Route::post('/permissions/bulk-delete', [PermissionController::class, 'bulkDelete'])->name('permissions.bulk-delete');
        Route::post('/role/bulk-delete', [RoleController::class, 'bulkDelete'])->name('role.bulk-delete');
    });
    // LINK Fire Safety
    Route::prefix('fire-safety')->group(function () {
        Route::resource('apar', AparController::class)
            ->parameters(['apar' => 'id'])
            ->names('apar');
        Route::resource('hydrant', HydrantController::class)
            ->parameters(['hydrant' => 'id'])
            ->names('hydrant');
        Route::resource('cekpoin-security', CekpointSecurityController::class)
            ->parameters(['cekpoin-security' => 'id'])
            ->names('cekpoin-security');
    });
    // LINK Inspection
    Route::prefix('inspection')->group(function () {
        Route::resource('apar', AparInspectionController::class)
            ->parameters(['apar' => 'id'])
            ->names('inspection.apar');
        Route::resource('hydrant', HydrantInspectionController::class)
            ->parameters(['hydrant' => 'id'])
            ->names('inspection.hydrant');
        Route::resource('cekpoint-inspeksi', CPSecurityInspectionController::class)
            ->parameters(['cp-security' => 'id'])
            ->names('inspection.cp-security');
        Route::get('apar-inspeksi/{id}', [InspectionController::class, 'aparinspeksi'])->name('apar.inspection');
        Route::get('hydrant-inspeksi/{id}', [InspectionController::class, 'hydrantinspeksi'])->name('hydrant.inspection');
        Route::get('cekpoint-inspeksi/{id}', [CPSecurityInspectionController::class, 'cpinspeksi'])->name('cp.inspection');
        Route::get('scan', function () {
            return Inertia::render('inspection/react-scan');
        })->name('apar.scan');
    });
    // LINK Scan
    Route::get('/hydrant/qrcode/{id}', [HydrantController::class, 'HydrantQRCode'])->name('hydrant.qrcode');
    Route::get('/hydrant/print-qrcode', [HydrantController::class, 'generateMassHydrantQRCode'])->name('hydrant.print-qrcode');
    Route::get('/hydrant/qr/options', [HydrantController::class, 'getFilterOptions'])->name('hydrant.filter.options');
    Route::get('/apar/qrcode/{id}', [AparController::class, 'generateQRCode'])->name('apar.qrcode');
    Route::get('/apar/print-qrcode', [AparController::class, 'generateMassQRCode'])->name('apar.print-qrcode');
    Route::get('/apar/qr/options', [AparController::class, 'getFilterOptions'])->name('apar.filter.options');
    Route::get('/cekpoint/qr/options', [CekpointSecurityController::class, 'getFilterOptions'])->name('cp.filter.options');
    Route::get('/cekpoin/print-qrcode', [CekpointSecurityController::class, 'generateMassCekPointQRCode'])->name('cp.print-qrcode');
    // LINK Master Data
    Route::prefix('master-data')->group(function () {
        Route::resource('pengguna', UserController::class)->parameters(['user' => 'id'])->names('pengguna');
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
        // ANCHOR Bulk Delete
        Route::post('departemen/bulk-delete', [DepartmentController::class, 'bulkDelete'])->name('departemen.bulk-delete');
        Route::post('unit-bisnis/bulk-delete', [OfficesController::class, 'bulkDelete'])->name('unit-bisnis.bulk-delete');
        Route::post('jabatan/bulk-delete', [JabatanController::class, 'bulkDelete'])->name('jabatan.bulk-delete');
        //ANCHOR Import Data
        Route::get('/upload-apar', [AparController::class, 'showUploadForm'])->name('apar.upload');
        Route::post('/upload-apar-import', [AparController::class, 'import'])->name('apar.import');
        Route::get('/upload-hydrant', [HydrantController::class, 'showUploadForm'])->name('hydrant.upload');
        Route::post('/import-hydrant', [HydrantController::class, 'import'])->name('hydrant.import');
        Route::get('/upload-cp', [CekpointSecurityController::class, 'showUploadForm'])->name('cekpoin-security.upload');
        Route::post('/import-cp', [CekpointSecurityController::class, 'import'])->name('cekpoint-security.import');
    });
});
Route::prefix('reports')->group(function () {
    Route::get('/apar-rekap', [AparInspectionController::class, 'rekap'])->name('apar.rekap');
    Route::get('/hydrant-rekap', [HydrantInspectionController::class, 'rekap'])->name('hydrant.rekap');

    Route::get('/apar-rekap/pdf', [AparInspectionController::class, 'exportPdf'])->name('apar.pdf');
    Route::get('/hydrant-rekap/pdf', [HydrantInspectionController::class, 'exportPdf'])->name('hydrant.pdf');
});
Route::get('/captcha', function () {
    return response()->json([
        'captcha' => captcha_src('white'),
    ]);
});
Route::get('/test-s3', function () {
    Storage::disk('s3')->put('test-folder/test.txt', 'Hello from Laravel!');
    return 'Uploaded!';
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
