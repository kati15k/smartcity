<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompaniesController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\JobsController;
use App\Http\Controllers\Api\PlacesController;
use App\Http\Controllers\Api\ReviewsController;
use App\Http\Controllers\Api\UniversitiesController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\DetailsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::apiResource('/users', UserController::class);
Route::apiResource('/companies', CompaniesController::class);
Route::apiResource('/jobs', JobsController::class);
Route::apiResource('/amusement', PlacesController::class);
Route::apiResource('/info', ReviewsController::class);
Route::apiResource('/places', PlacesController::class);
Route::apiResource('/academic_list', UniversitiesController::class);
Route::apiResource('/job_list', JobsController::class);
Route::apiResource('/companies_list', CompaniesController::class);
Route::apiResource('/dashboard', DashboardController::class);

Route::get('/dashboard', [DashboardController::class, 'getDashboardData']);

Route::post('/info', [ReviewsController::class, 'store']);
Route::apiResource('/reviews', ReviewsController::class);
Route::apiResource('/academic', UniversitiesController::class);

Route::delete('/reviews/{id}', [ReviewsController::class, 'destroy']);

Route::get('info/{tableName}/{id}', [DetailsController::class, 'getDetails']);


Route::delete('/places/{id}', [PlacesController::class, 'destroy']);
Route::put('/places/{id}', [PlacesController::class, 'update']);

Route::post('/register', [AuthController::class, 'registration']);
Route::post('/login', [AuthController::class, 'login']);
Route::put('/users/{id}', [UserController::class, 'update']);


