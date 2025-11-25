<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;

class ProductController extends Controller
{
    // This method will return all products
    public function index()
    {
        $product = product::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data'   => $product
        ]);
    }

    // This method will store a new product
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'             => 'required',
            'price'             => 'required|numeric',
            'compare_price'     => 'nullable|numeric',
            'category'       => 'required|integer',
            'sku'               => 'required|string|max:255|unique:products,sku',
            'is_featured'       => 'required|in:yes,no',
            'status'            => 'required|in:0,1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        // Store the product in the database
        $product = new Product();
        $product->title             = $request->title;
        $product->price             = $request->price;
        $product->compare_price     = $request->compare_price;
        $product->category_id       = $request->category;
        $product->brand_id          = $request->brand;
        $product->sku               = $request->sku;
        $product->qty               = $request->qty;
        $product->description       = $request->description;
        $product->short_description = $request->short_description;
        $product->status            = $request->status;
        $product->save();

        return response()->json([
            'status'  => true,
            'message' => 'Product created successfully',
            'product' => $product
        ]);
    }

    // This method will return a single product
    public function show($id)
    {
        return response()->json([
            'message' => "Single product with ID: $id"
        ]);
    }

    // This method will update a product
    public function update(Request $request, $id)
    {
        return response()->json([
            'message' => "Product updated with ID: $id"
        ]);
    }

    // This method will delete a product
    public function destroy($id)
    {
        return response()->json([
            'message' => "Product deleted with ID: $id"
        ]);
    }
}
