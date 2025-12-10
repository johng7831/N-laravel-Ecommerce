<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Order;

class AuthController extends Controller
{
    /**
     * Admin Login
     */
    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $user = Auth::user();

            if ($user->role !== 'admin') {
                return response()->json([
                    'status'  => 401,
                    'message' => 'You are not authorized to access this Admin Panel',
                ], 401);
            }

            // Create token
            $token = $user->createToken('admin_token')->plainTextToken;

            return response()->json([
                'status'  => 200,
                'message' => 'Login successful',
                'token'   => $token,
                'id'      => $user->id,
                'name'    => $user->name,
                'email'   => $user->email,
                'role'    => $user->role,
            ], 200);
        }

        return response()->json([
            'status'  => 401,
            'message' => 'Either Email or Password is incorrect',
        ], 401);
    }

    /**
     * Get all orders (Admin Only)
     */
    public function getAllOrder()
    {
        $user = auth()->user();

        // Must be admin
        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Fetch all orders with order items + user details
        $orders = Order::with(['orderItems', 'user'])
            ->orderBy('id', 'DESC')
            ->get();

        if ($orders->isEmpty()) {
            return response()->json([
                'message' => 'No orders found',
                'orders'  => []
            ], 200);
        }

        return response()->json([
            'message' => 'All orders retrieved successfully',
            'orders'  => $orders,
        ], 200);
    }

    /**
     * Change password for authenticated admin
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password'      => 'required',
            'password'              => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = $request->user();

        // Ensure user exists and is admin (middleware should handle this)
        if (!$user || $user->role !== 'admin') {
            return response()->json([
                'status'  => 401,
                'message' => 'You are not authorized to perform this action',
            ], 401);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status'  => 422,
                'message' => 'Current password is incorrect',
            ], 422);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Revoke existing tokens so user must log in again
        $user->tokens()->delete();

        return response()->json([
            'status'  => 200,
            'message' => 'Password updated successfully. Please log in again.',
        ], 200);
    }
}
