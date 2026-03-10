<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    // Get all images
    public function index()
    {
        $images = Image::orderBy('order')->get();
        return response()->json($images);
    }

    // Get images by category
    public function byCategory($category)
    {
        $images = Image::where('category', $category)
                       ->orderBy('order')
                       ->get();
        return response()->json($images);
    }

    // Get images for a specific update
    public function byUpdate($updateId)
    {
        $images = Image::where('update_id', $updateId)
                       ->orderBy('order')
                       ->get();
        return response()->json($images);
    }

    // Create new image
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string',
            'path' => 'required|string',
            'category' => 'nullable|string',
            'update_id' => 'nullable|integer',
            'order' => 'integer',
            'is_featured' => 'boolean',
        ]);

        $image = Image::create($validated);
        return response()->json($image, 201);
    }

    // Update image
    public function update(Request $request, $id)
    {
        $image = Image::findOrFail($id);
        $image->update($request->all());
        return response()->json($image);
    }

    // Delete image
    public function destroy($id)
    {
        Image::destroy($id);
        return response()->json(['message' => 'Image deleted successfully']);
    }
}