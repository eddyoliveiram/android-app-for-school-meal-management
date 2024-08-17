<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DailyRecordController;
use App\Http\Controllers\SchoolController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::get('schools', [SchoolController::class, 'index'])->name('schools.index');
Route::post('schools', [SchoolController::class, 'store'])->name('schools.store');
Route::get('schools/{school}', [SchoolController::class, 'show'])->name('schools.show');
Route::put('schools/{school}', [SchoolController::class, 'update'])->name('schools.update');
Route::patch('schools/{school}', [SchoolController::class, 'update'])->name('schools.update');
Route::delete('schools/{school}', [SchoolController::class, 'destroy'])->name('schools.destroy');

Route::post('schools/{school}/register-item', [SchoolController::class, 'registerItem'])->name('schools.register-item');
Route::patch('schools/{school}/items/{item}/consume-item', [SchoolController::class, 'updateItemConsumption'])->name('schools.consume-item');
Route::get('schools/{school}/items', [SchoolController::class, 'getItems'])->name('schools.items');
Route::get('schools/{school}/daily-records/{dailyRecord}', [DailyRecordController::class, 'showRecordForSchool'])
    ->name('schools.daily-records.show');

Route::get('daily-records', [DailyRecordController::class, 'index'])->name('daily-records.index');
Route::post('daily-records', [DailyRecordController::class, 'store'])->name('daily-records.store');
Route::get('daily-records/{id}', [DailyRecordController::class, 'show'])->name('daily-records.show');
Route::put('daily-records/{id}', [DailyRecordController::class, 'update'])->name('daily-records.update');
Route::delete('daily-records/{id}', [DailyRecordController::class, 'destroy'])->name('daily-records.destroy');

Route::middleware(['auth:sanctum','admin'])->group(function () {
//    Route::post('/posts', [PostController::class, 'store']);
//    Route::put('/posts/{id}', [PostController::class, 'update']);
//    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->group(function () {
//    Route::get('/posts/{id}', [PostController::class, 'show']);
});
