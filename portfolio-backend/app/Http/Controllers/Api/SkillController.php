<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    // Get all visible skills (for public view)
    public function index()
    {
        $skills = Skill::where('is_visible', true)
                       ->orderBy('order')
                       ->orderBy('category')
                       ->get();
        return response()->json($skills);
    }

    // Get all skills including hidden (for admin)
    public function admin()
    {
        $skills = Skill::orderBy('category')
                       ->orderBy('order')
                       ->get();
        return response()->json($skills);
    }

    // Create new skill
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'order' => 'integer',
            'is_visible' => 'boolean',
        ]);

        $skill = Skill::create($validated);
        return response()->json($skill, 201);
    }

    // Update skill
    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $skill->update($request->all());
        return response()->json($skill);
    }

    // Delete skill
    public function destroy($id)
    {
        Skill::destroy($id);
        return response()->json(['message' => 'Skill deleted successfully']);
    }
}