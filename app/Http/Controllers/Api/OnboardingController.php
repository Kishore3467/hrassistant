<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Onboarding;
use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    // POST /api/onboardings
    public function store(Request $request)
    {
        $validated = $request->validate([
            // You can pass either company name OR company_id
            'company' => 'nullable|string',
            'company_id' => 'nullable|exists:companies,id',

            'full_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip' => 'nullable|string|max:20',
            'degree' => 'nullable|string|max:150',
            'university' => 'nullable|string|max:150',
            'graduation_year' => 'nullable|string|max:10',
            'job_title' => 'nullable|string|max:150',
            'years_of_exp' => 'nullable|integer|min:0|max:80',
        ]);

        // Resolve company
        if (empty($validated['company_id'])) {
            if (empty($validated['company'])) {
                return response()->json(['message' => 'company or company_id is required'], 422);
            }
            $company = Company::firstOrCreate(['name' => $validated['company']]);
        } else {
            $company = Company::findOrFail($validated['company_id']);
        }

        $onboarding = Onboarding::create([
            'company_id'       => $company->id,
            'full_name'        => $validated['full_name'],
            'email'            => $validated['email'],
            'phone'            => $validated['phone'] ?? null,
            'address'          => $validated['address'] ?? null,
            'city'             => $validated['city'] ?? null,
            'state'            => $validated['state'] ?? null,
            'zip'              => $validated['zip'] ?? null,
            'degree'           => $validated['degree'] ?? null,
            'university'       => $validated['university'] ?? null,
            'graduation_year'  => $validated['graduation_year'] ?? null,
            'job_title'        => $validated['job_title'] ?? null,
            'years_of_exp'     => $validated['years_of_exp'] ?? null,
        ]);

        return response()->json([
            'message' => 'Onboarding saved',
            'data'    => $onboarding->load('company'),
        ], 201);
    }

    // GET /api/onboardings?company=TCS  OR  /api/onboardings?company_id=1
    public function index(Request $request)
    {
        $request->validate([
            'company' => 'nullable|string',
            'company_id' => 'nullable|exists:companies,id',
        ]);

        if ($request->filled('company_id')) {
            $companyId = (int)$request->company_id;
        } elseif ($request->filled('company')) {
            $company = Company::where('name', $request->company)->first();
            if (!$company) return response()->json(['data' => []]);
            $companyId = $company->id;
        } else {
            return response()->json(['message' => 'company or company_id is required'], 422);
        }

        $rows = Onboarding::with('company')->where('company_id', $companyId)->latest()->get();

        return response()->json(['data' => $rows]);
    }
}
