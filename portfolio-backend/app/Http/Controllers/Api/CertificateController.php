<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    // Get all visible certificates (for public view)
    public function index()
    {
        $certificates = Certificate::where('is_visible', true)
                                   ->orderBy('issue_date', 'desc')
                                   ->get();
        return response()->json($certificates);
    }

    // Get all certificates including hidden (for admin)
    public function admin()
    {
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        return response()->json($certificates);
    }

    // Create new certificate
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'full_name' => 'required|string',
            'issuer' => 'required|string',
            'image' => 'required|string',
            'issue_date' => 'required|date',
            'certificate_no' => 'nullable|string',
            'score' => 'nullable|string',
            'skills' => 'nullable|string',
            'description' => 'nullable|string',
            'is_visible' => 'boolean',
        ]);

        $certificate = Certificate::create($validated);
        return response()->json($certificate, 201);
    }

    // Update certificate
    public function update(Request $request, $id)
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->update($request->all());
        return response()->json($certificate);
    }

    // Delete certificate
    public function destroy($id)
    {
        Certificate::destroy($id);
        return response()->json(['message' => 'Certificate deleted successfully']);
    }
}