<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Update;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class UpdateController extends Controller
{
    // Public: Only show updates from the last 24 hours
    public function index()
    {
        $updates = Update::where('is_published', true)
                         ->where('created_at', '>=', Carbon::now()->subHours(24))
                         ->orderBy('created_at', 'desc')
                         ->get();
        return response()->json($updates);
    }

    // Admin: Show all updates (no time filter)
    public function admin()
    {
        $updates = Update::orderBy('created_at', 'desc')->get();
        return response()->json($updates);
    }

    // Store new update with optional multiple image uploads
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'images'       => 'nullable|array',
            'images.*'     => 'image|mimes:jpg,jpeg,png,gif,webp|max:5120',
            'category'     => 'nullable|string',
            'is_published' => 'nullable',
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('updates', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }

        $update = Update::create([
            'title'        => $validated['title'],
            'description'  => $validated['description'],
            'images'       => !empty($imagePaths) ? $imagePaths : null,
            'category'     => $validated['category'] ?? null,
            'is_published' => $request->boolean('is_published', true),
        ]);

        return response()->json($update, 201);
    }

    // Update existing update
    public function update(Request $request, $id)
    {
        $update = Update::findOrFail($id);

        $validated = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'description'  => 'sometimes|string',
            'images'       => 'nullable|array',
            'images.*'     => 'image|mimes:jpg,jpeg,png,gif,webp|max:5120',
            'category'     => 'nullable|string',
            'is_published' => 'nullable',
        ]);

        $data = [
            'title'       => $validated['title'] ?? $update->title,
            'description' => $validated['description'] ?? $update->description,
            'category'    => $validated['category'] ?? $update->category,
        ];

        if ($request->has('is_published')) {
            $data['is_published'] = $request->boolean('is_published');
        }

        if ($request->hasFile('images')) {
            // Delete old images
            if ($update->images) {
                foreach ($update->images as $oldImage) {
                    $oldPath = str_replace('/storage/', '', $oldImage);
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $imagePaths = [];
            foreach ($request->file('images') as $file) {
                $path = $file->store('updates', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
            $data['images'] = $imagePaths;
        }

        $update->update($data);
        return response()->json($update);
    }

    // Delete update
    public function destroy($id)
    {
        $update = Update::findOrFail($id);

        // Delete associated images
        if ($update->images) {
            foreach ($update->images as $img) {
                $path = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($path);
            }
        }

        $update->delete();
        return response()->json(['message' => 'Update deleted successfully']);
    }
}