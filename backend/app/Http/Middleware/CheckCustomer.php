<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckCustomer
{
    public function handle(Request $request, Closure $next)
    {
        // THIS is how you correctly get the Sanctum authenticated user
        $user = $request->user();  

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated (no valid token)'
            ], 401);
        }

        // Allowed roles
        $allowedRoles = ['customer', 'user'];

        if (!in_array($user->role, $allowedRoles)) {
            return response()->json([
                'message' => 'Only customers can access this section',
                'your_role' => $user->role
            ], 403);
        }

        return $next($request);
    }
}
