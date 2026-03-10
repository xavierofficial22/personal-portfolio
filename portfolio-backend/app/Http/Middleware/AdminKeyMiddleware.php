<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminKeyMiddleware
{
    /**
     * Verify the X-Admin-Key header matches the stored key.
     * Uses hash_equals to prevent timing attacks.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $providedKey = $request->header('X-Admin-Key');
        $storedKey = config('app.admin_api_key');

        if (!$providedKey || !$storedKey || !hash_equals($storedKey, $providedKey)) {
            return response()->json([
                'message' => 'Unauthorized.',
            ], 401);
        }

        return $next($request);
    }
}
