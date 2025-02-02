<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShortUrlController;

Route::get('/', [PageController::class, 'index'])->name('pages.index');

Route::post('/shorten', [ShortUrlController::class, 'store'])->name('shorten.store');
Route::get('/{shortCode}', [ShortUrlController::class, 'redirect'])->name('shorten.redirect');
