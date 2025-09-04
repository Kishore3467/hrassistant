<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Candidate;

class CandidateController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullName' => 'required|string|max:255',
            'email'    => 'required|email',
            'phone'    => 'required|string',
            'address'  => 'nullable|string',
            'city'     => 'nullable|string',
            'state'    => 'nullable|string',
            'zip'      => 'nullable|string',
            'degree'   => 'nullable|string',
            'university' => 'nullable|string',
            'graduationYear' => 'nullable|string',
            'company'  => 'nullable|string',
            'jobTitle' => 'nullable|string',
            'yearsOfExp' => 'nullable|numeric',
        ]);

        $candidate = Candidate::create($validated);

        return response()->json([
            'message' => 'Candidate stored successfully',
            'candidate' => $candidate
        ], 201);
    }

    public function index()
    {
        return Candidate::all();
    }
}
