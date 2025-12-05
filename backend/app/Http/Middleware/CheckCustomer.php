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
        // Get logged-in user
        $user = User::find(auth()->id());

        // Check if user exists and has customer role (role = 'user' or 'customer')
        if (!$user || ($user->role !== 'user' && $user->role !== 'customer')) {
            return response()->json([
                'message' => 'Only customers can access this section'
            ], 401);
        }

        return $next($request);
    }
}

