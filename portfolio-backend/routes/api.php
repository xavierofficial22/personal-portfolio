<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UpdateController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\PageViewController;

// ── Admin: Verify API Key ─────────────────────────────
Route::post('/admin/verify', function (Illuminate\Http\Request $request) {
    $providedKey = $request->header('X-Admin-Key');
    $storedKey = config('app.admin_api_key');

    if (!$providedKey || !$storedKey || !hash_equals($storedKey, $providedKey)) {
        return response()->json(['authenticated' => false], 401);
    }

    return response()->json(['authenticated' => true]);
})->middleware('throttle:5,1'); // Max 5 attempts per minute

// ── Public Routes ─────────────────────────────────────
Route::get('/updates', [UpdateController::class, 'index']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::get('/images', [ImageController::class, 'index']);
Route::get('/images/category/{category}', [ImageController::class, 'byCategory']);
Route::get('/images/update/{updateId}', [ImageController::class, 'byUpdate']);
Route::post('/track', [PageViewController::class, 'track'])->middleware('throttle:30,1');

// ── Protected Admin Routes ────────────────────────────
Route::middleware(['admin.key', 'throttle:60,1'])->prefix('admin')->group(function () {

    // Metrics
    Route::get('/metrics', [PageViewController::class, 'metrics']);

    // Updates
    Route::get('/updates', [UpdateController::class, 'admin']);
    Route::post('/updates', [UpdateController::class, 'store']);
    Route::put('/updates/{id}', [UpdateController::class, 'update']);
    Route::delete('/updates/{id}', [UpdateController::class, 'destroy']);

    // Skills
    Route::get('/skills', [SkillController::class, 'admin']);
    Route::post('/skills', [SkillController::class, 'store']);
    Route::put('/skills/{id}', [SkillController::class, 'update']);
    Route::delete('/skills/{id}', [SkillController::class, 'destroy']);

    // Certificates
    Route::get('/certificates', [CertificateController::class, 'admin']);
    Route::post('/certificates', [CertificateController::class, 'store']);
    Route::put('/certificates/{id}', [CertificateController::class, 'update']);
    Route::delete('/certificates/{id}', [CertificateController::class, 'destroy']);

    // Images
    Route::get('/images', [ImageController::class, 'index']);
    Route::post('/images', [ImageController::class, 'store']);
    Route::put('/images/{id}', [ImageController::class, 'update']);
    Route::delete('/images/{id}', [ImageController::class, 'destroy']);
});