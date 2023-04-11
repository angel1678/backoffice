<?php

use App\Http\Controllers\ProcesoController;
use App\Http\Controllers\ProcesoMovimientoController;
use App\Http\Controllers\ProcesoMovimientoDetalleController;
use App\Http\Controllers\ProfileController;
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
    return redirect()->route('proceso.index');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/proceso/batch', [ProcesoController::class, 'batchStore'])->name('proceso.batchStore');
    Route::get('/proceso/{proceso}/movimiento/{movimiento}', [ProcesoMovimientoDetalleController::class, 'index'])->name('proceso.movimiento.detalle');
    Route::get('/proceso/{proceso}/movimiento', [ProcesoMovimientoController::class, 'index'])->name('proceso.movimiento');
    Route::resource('/proceso', ProcesoController::class)->except('show', 'edit');
});

require __DIR__.'/auth.php';
