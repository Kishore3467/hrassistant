<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmployeeOnboarding;
use Illuminate\Http\Request;

class EmployeeOnboardingController extends Controller
{
    public function store(Request $request)
    {
        // Validate input - you can customize these rules as needed
        $validated = $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|unique:employee_onboardings,email',
            'phone' => 'required|string|max:30',
            'address' => 'required|string',
            'dateOfBirth' => 'required|date',
            'emergencyContactName' => 'required|string|max:255',
            'emergencyContactPhone' => 'required|string|max:30',
            'education' => 'nullable|string',       // store multi-line text
            'experience' => 'nullable|string',
            'bankName' => 'nullable|string|max:255',
            'accountNumber' => 'nullable|string|max:50',
            'ifscCode' => 'nullable|string|max:50',
            'companyEmail' => 'nullable|email',
            'laptopSerial' => 'nullable|string|max:255',
            'kitStatus' => 'nullable|string|max:255',
            'joiningDate' => 'nullable|date',
            'department' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'employeeId' => 'nullable|string|max:255',
            'workLocation' => 'nullable|string|max:255',
            'probationPeriod' => 'nullable|string|max:255',
            'reportingManager' => 'nullable|string|max:255',
            'additionalNotes' => 'nullable|string',
        ]);

        $employee = EmployeeOnboarding::create($validated);

        return response()->json(['message' => 'Employee onboarded successfully', 'data' => $employee]);
    }
}
