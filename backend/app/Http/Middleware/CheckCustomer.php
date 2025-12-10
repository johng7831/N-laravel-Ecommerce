<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class CheckCustomer
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Get authenticated user directly from auth()
        $user = auth()->user();

        // Check if user exists and has customer role (role = 'user' or 'customer')
        if (!$user || ($user->role !== 'user' && $user->role !== 'customer')) {
            return response()->json([
                'message' => 'Only customers can access this sections'
            ], 401);
        }

        return $next($request);
    }
}