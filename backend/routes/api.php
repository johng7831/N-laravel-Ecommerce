<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;

Route::post('/admin/login', [AuthController::class, 'authenticate']);



Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/categories', [CategoryController::class, 'index']);

});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider
| within a group assigned the "api" middleware group.
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
