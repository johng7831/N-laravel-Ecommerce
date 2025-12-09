<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{
    /**
     * Save Order
     */
    public function saveOrder(Request $request)
    {
        $validated = $request->validate([
            'items'                => 'required|array|min:1',
            'items.*.product_id'   => 'required|integer',
            'items.*.quantity'     => 'required|integer|min:1',
            'items.*.price'        => 'required|numeric|min:0',

            'name'                 => 'required|string|max:255',
            'email'                => 'required|email',
            'address'              => 'required|string|max:500',
            'city'                 => 'required|string|max:255',
            'state'                => 'required|string|max:255',
            'zip'                  => 'required|string|max:50',
            'phone'                => 'required|string|max:50',

            'payment_method'       => 'nullable|string|in:cod,stripe',
            'shipping'             => 'nullable|numeric|min:0',
        ]);

        if (empty($validated['items'])) {
            return response()->json(['message' => 'Your Cart is Empty'], 400);
        }

        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Calculate totals
        $subtotal = 0;
        foreach ($validated['items'] as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }

        $shipping = $validated['shipping'] ?? 5.00;
        $totalPrice = $subtotal + $shipping;

        // Save order
        $order = Order::create([
            'user_id'        => $user->id,
            'total_price'    => $totalPrice,
            'status'         => 'Pending',
            'payment_method' => $validated['payment_method'] ?? 'cod',
            'payment_status' => 'pending',
            'payment_url'    => '',
            'payment_id'     => '',
            'address'        => $validated['address'],
            'city'           => $validated['city'],
            'state'          => $validated['state'],
            'zip'            => $validated['zip'],
            'phone'          => $validated['phone'],
            'email'          => $validated['email'],
            'name'           => $validated['name'],
        ]);

        // Save order items
        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id'    => $order->id,
                'product_id'  => $item['product_id'],
                'quantity'    => $item['quantity'],
                'price'       => $item['price'],
                'total_price' => $item['price'] * $item['quantity'],
                'size'        => $item['size'] ?? '',
                'color'       => $item['color'] ?? '',
                'image'       => $item['image'] ?? '',
                'name'        => $item['name'] ?? '',
            ]);
        }

        return response()->json([
            'message'  => 'Order placed successfully!',
            'order_id' => $order->id,
            'order'    => $order->load('orderItems'),
        ], 200);
    }

    /**
     * Get Order Detail by ID
     */
    public function getOrder($id)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $order = Order::with('orderItems')
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json([
            'message' => 'Order details retrieved successfully',
            'order'   => $order,
        ], 200);
    }
}
