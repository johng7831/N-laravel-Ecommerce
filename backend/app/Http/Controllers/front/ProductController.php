<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;

class ProductController extends Controller
{
    /**
     * GET /api/latest-products
     * Latest products for homepage/sections.
     */
    public function latestProducts()
    {
        $products = Product::with('images')
            ->where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->take(12)
            ->get();

        return response()->json([
            'status' => 200,
            'data'   => $products,
        ]);
    }

    /**
     * GET /api/featured-products
     * Featured products list.
     */
    public function featuredProduct()
    {
        $products = Product::with('images')
            ->where('status', 1)
            ->where('is_featured', 'yes')
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data'   => $products,
        ]);
    }

    /**
     * GET /api/get-categories
     * Categories for shop filters (public).
     */
    public function getCategories()
    {
        $categories = Category::where('status', 1)
            ->orderBy('name', 'ASC')
            ->get();

        return response()->json([
            'status' => 200,
            'data'   => $categories,
        ]);
    }

    /**
     * GET /api/get-brands
     * Brands for shop filters (public).
     */
    public function getBrand()
    {
        $brands = Brand::where('status', 1)
            ->orderBy('name', 'ASC')
            ->get();

        return response()->json([
            'status' => 200,
            'data'   => $brands,
        ]);
    }

    /**
     * GET /api/get-products
     * GET /api/get-products/{id}
     * Public product listing and single product for frontend.
     */
    public function getproduct($id = null)
    {
        if ($id !== null) {
            $product = Product::with('images')
                ->where('status', 1)
                ->find($id);

            if (!$product) {
                return response()->json([
                    'status'  => 404,
                    'message' => 'Product not found',
                ], 404);
            }

            return response()->json([
                'status' => 200,
                'data'   => $product,
            ]);
        }

        $products = Product::with('images')
            ->where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data'   => $products,
        ]);
    }
}


