<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Size;

class SizeController extends Controller
{
    public function index()
    {
        $sizes = Size::orderBy('name', 'ASC')->get();

        return response()->json([
            'status' => 200,
            'data'   => $sizes
        ], 200);
    }
}
