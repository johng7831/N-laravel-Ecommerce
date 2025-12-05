<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class CheckUser
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Logged-in user
        $user = User::find(auth()->id());

        // Check role = user
        if (!$user || $user->role !== 'user') {
            return response()->json([
                'message' => 'Only normal users can access this section'
            ], 401);
        }

        return $next($request);
    }
}
