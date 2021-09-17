<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;

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
    return view('welcome.other_content');
});

Route::get('/{any}', [ApplicationController::class, 'index'])->where('any', '.*');

// Default Login
Route::get('user/login', 'UserController@checkUsername');
Route::post('user/sign-up', 'UserController@userSignUp');

// Google Login
Route::get('auth/google', 'API\SocialLoginController@redirectToGoogle');
Route::get('auth/google/callback', 'API\SocialLoginController@handleGoogleCallback');
// Facebook Login
Route::get('auth/facebook', 'API\SocialLoginController@facebookRedirect');
Route::get('auth/facebook/callback', 'API\SocialLoginController@loginWithFacebook');
