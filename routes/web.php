<?php

use App\Http\Controllers\Coercive\AccountController as CoerciveAccountController;
use App\Http\Controllers\Coercive\ContactController as CoerciveContactController;
use App\Http\Controllers\Proceso\DetalleComentarioController;
use App\Http\Controllers\Proceso\MovimientoDetalleController;
use App\Http\Controllers\Proceso\UserController as ProcesoUserController;
use App\Http\Controllers\ProcesoController;
use App\Http\Controllers\ProcesoDetalleLastUpdateController;
use App\Http\Controllers\ProcesoDetenidoController;
use App\Http\Controllers\ProcesoMovimientoController;
use App\Http\Controllers\ProcesoMovimientoDetalleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/setting', [SettingController::class, 'edit'])->name('setting.edit');
    Route::patch('/setting', [SettingController::class, 'update'])->name('setting.update');

    Route::get('/proceso-last-update', [ProcesoDetalleLastUpdateController::class, 'index'])->name('proceso-last-update.index');
    Route::get('/proceso-detenido', [ProcesoDetenidoController::class, 'index'])->name('proceso-detenido.index');

    Route::post('/proceso/batch', [ProcesoController::class, 'batchStore'])->name('proceso.batchStore');
    Route::post('/proceso/detalle/{detalle}/comentario', [DetalleComentarioController::class, 'store'])->name('proceso.detalle.comentario.store');
    Route::resource('/proceso/movimiento', MovimientoDetalleController::class, ['as' => 'proceso'])->only('show');

    Route::get('/proceso/{proceso}/user', [ProcesoUserController::class, 'index'])->name('proceso.user.index');
    Route::post('/proceso/{proceso}/user', [ProcesoUserController::class, 'store'])->name('proceso.user.store');
    Route::delete('/proceso/{proceso}/user/{user}', [ProcesoUserController::class, 'destroy'])->name('proceso.user.destroy');
    Route::get('/proceso/{proceso}/movimiento/{movimiento}', [ProcesoMovimientoDetalleController::class, 'index'])->name('proceso.movimiento.detalle');
    Route::get('/proceso/{proceso}/movimiento', [ProcesoMovimientoController::class, 'index'])->name('proceso.movimiento');
    Route::resource('/proceso', ProcesoController::class)->except('show');
});

Route::middleware('auth')->prefix('coercive')->group(function () {
    Route::post('/accounts/batch', [CoerciveAccountController::class, 'batchStore'])->name('coercive.accounts.batchStore');
    Route::get('/accounts/{account}/contacts/create', [CoerciveContactController::class, 'create'])->name('coercive.accounts.contacts.create');
    Route::post('/accounts/{account}/contacts', [CoerciveContactController::class, 'store'])->name('coercive.accounts.contacts.store');
    Route::delete('/accounts/{account}/contacts/{contact}', [CoerciveContactController::class, 'destroy'])->name('coercive.accounts.contacts.destroy');
    Route::resource('/accounts', CoerciveAccountController::class, ['as' => 'coercive']);
});

require __DIR__ . '/auth.php';
