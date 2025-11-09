<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // This method returns all categories
    public function index()
    {
        $categories = Category::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'data'   => $categories
        ]);
    }

    // This method will store category in DB
    public function store(Request $request)
    {
        //
    }

    // This method will update a single category
    public function update(Request $request, $id)
    {
        //
    }

    // This method will show a single category
    public function show($id)
    {
        //
    }

    // This method will destroy a single category
    public function destroy($id)
    {
        //
    }
}


