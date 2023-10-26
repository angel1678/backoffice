<?php

use App\Http\Controllers\Coercive\ClientAccountExportController as CoerciveClientAccountExportController;
use App\Http\Controllers\Coercive\ClientAccountController as CoerciveClientAccountController;
use App\Http\Controllers\Coercive\ClientController as CoerciveClientController;
use App\Http\Controllers\Coercive\AccountContactController as CoerciveAccountContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ManagementController;
use App\Http\Controllers\Proceso\AccountExportController as JudiciaryAccountExportController;
use App\Http\Controllers\Proceso\DetalleComentarioController;
use App\Http\Controllers\Proceso\MovimientoDetalleController;
use App\Http\Controllers\Proceso\UserController as ProcesoUserController;
use App\Http\Controllers\ProcesoController;
use App\Http\Controllers\ProcesoDetalleLastUpdateController;
use App\Http\Controllers\ProcesoDetenidoController;
use App\Http\Controllers\ProcesoMovimientoController;
use App\Http\Controllers\ProcesoMovimientoDetalleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\User\UserNotificationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/setting', [SettingController::class, 'edit'])->name('setting.edit');
    Route::patch('/setting', [SettingController::class, 'update'])->name('setting.update');

    Route::get('/proceso-last-update', [ProcesoDetalleLastUpdateController::class, 'index'])->name('proceso-last-update.index');
    Route::get('/proceso-detenido/export', [JudiciaryAccountExportController::class, 'index'])->name('proceso-detenido.export');
    Route::get('/proceso-detenido', [ProcesoDetenidoController::class, 'index'])->name('proceso-detenido.index');

    Route::post('/proceso/batch', [ProcesoController::class, 'batchStore'])->name('proceso.batchStore');
    Route::post('/proceso/detalle/{detalle}/comentario', [DetalleComentarioController::class, 'store'])->name('proceso.detalle.comentario.store');
    Route::resource('/proceso/movimiento', MovimientoDetalleController::class, ['as' => 'proceso'])->only('show');

    Route::get('/proceso/export', [JudiciaryAccountExportController::class, 'index'])->name('proceso.export');
    Route::get('/proceso/{proceso}/user', [ProcesoUserController::class, 'index'])->name('proceso.user.index');
    Route::post('/proceso/{proceso}/user', [ProcesoUserController::class, 'store'])->name('proceso.user.store');
    Route::delete('/proceso/{proceso}/user/{user}', [ProcesoUserController::class, 'destroy'])->name('proceso.user.destroy');
    Route::get('/proceso/{proceso}/movimiento/{movimiento}', [ProcesoMovimientoDetalleController::class, 'index'])->name('proceso.movimiento.detalle');
    Route::get('/proceso/{proceso}/movimiento', [ProcesoMovimientoController::class, 'index'])->name('proceso.movimiento');
    Route::resource('/proceso', ProcesoController::class)->except('show');

    Route::get('/management', [ManagementController::class, 'index'])->name('management.index');
    Route::get('/user/notification/{id}', [UserNotificationController::class, 'show'])->name('user.notification.show');
});

Route::middleware('auth')->prefix('process')->group(function () {
    Route::get('/report', [ReportController::class, 'index'])->name('process.report.index');
});

Route::middleware('auth')->prefix('coercive')->group(function () {
    Route::get('/accounts/{account}/contacts/create', [CoerciveAccountContactController::class, 'create'])->name('coercive.accounts.contacts.create');
    Route::post('/accounts/{account}/contacts', [CoerciveAccountContactController::class, 'store'])->name('coercive.accounts.contacts.store');
    Route::delete('/accounts/{account}/contacts/{contact}', [CoerciveAccountContactController::class, 'destroy'])->name('coercive.accounts.contacts.destroy');

    Route::post('/clients/{client}/accounts/batch', [CoerciveClientAccountController::class, 'batchStore'])->name('coercive.clients.accounts.batchStore');
    Route::put('/clients/{client}/accounts/{account}', [CoerciveClientAccountController::class, 'update'])->name('coercive.clients.accounts.update');
    Route::get('/clients/{client}/accounts/edit/{account}', [CoerciveClientAccountController::class, 'edit'])->name('coercive.clients.accounts.edit');
    Route::get('/clients/{client}/accounts/export', [CoerciveClientAccountExportController::class, 'index'])->name('coercive.clients.accounts.export');
    Route::get('/clients/{client}/accounts/create', [CoerciveClientAccountController::class, 'create'])->name('coercive.clients.accounts.create');
    Route::get('/clients/{client}/accounts', [CoerciveClientAccountController::class, 'index'])->name('coercive.clients.accounts.index');

    Route::get('/clients', [CoerciveClientController::class, 'index'])->name('coercive.clients.index');
    Route::get('/clients/create', [CoerciveClientController::class, 'create'])->name('coercive.clients.create');
    Route::post('/clients', [CoerciveClientController::class, 'store'])->name('coercive.clients.store');
});

require __DIR__ . '/auth.php';
