<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('/documents', DocumentController::class)->middleware('auth:sanctum');
Route::get('/admin/documents', [DocumentController::class, 'adminIndex'])->middleware('auth:sanctum');

Route::apiResource('/admin/users', UserController::class)->middleware('auth:sanctum');