<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {
        if (empty($request->items)) {
            return response()->json(['message' => 'Your Cart is Empty'], 400);
        }

        // Calculate total price from items
        $subtotal = 0;
        foreach ($request->items as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }
        $shipping = $request->shipping ?? 5.00; // Default shipping
        $totalPrice = $subtotal + $shipping;

        // Create a new order
        $order = new Order();
        $order->user_id = auth()->user()->id;
        $order->total_price = $totalPrice;
        $order->status = 'Pending';
        $order->payment_method = $request->payment_method ?? 'cod';
        $order->payment_status = $request->payment_method === 'cod' ? 'pending' : 'pending';
        $order->payment_url = '';
        $order->payment_id = '';
        $order->address = $request->address;
        $order->city = $request->city;
        $order->state = $request->state;
        $order->zip = $request->zip;
        $order->phone = $request->phone;
        $order->email = $request->email;
        $order->name = $request->name;
        $order->save();

        // Save order items
        foreach ($request->items as $item) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item['product_id'];
            $orderItem->quantity = $item['quantity'];
            $orderItem->price = $item['price'];
            $orderItem->total_price = $item['price'] * $item['quantity'];
            $orderItem->size = $item['size'] ?? '';
            $orderItem->color = $item['color'] ?? '';
            $orderItem->image = $item['image'] ?? '';
            $orderItem->name = $item['name'] ?? '';
            $orderItem->save();
        }

        return response()->json([
            'message' => 'Order placed successfully!',
            'order_id' => $order->id,
            'order' => $order
        ], 200);
    }

    public function getOrder($id)
    {
        $order = Order::with('orderItems')->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Check if the order belongs to the authenticated user
        if ($order->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'order' => $order
        ], 200);
    }
}