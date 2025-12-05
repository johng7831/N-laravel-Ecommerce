<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Get logged-in user
        $user = User::find(auth()->id());

        // Check admin role
        if (!$user || $user->role !== 'admin') {
            return response()->json([
                'message' => 'You are not authorized to access this Admin Panel'
            ], 401);
        }

        return $next($request);
    }
}
