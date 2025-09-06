<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        // Only employees for logged-in user's company
        $companyId = $request->user()->company_id;
        return Employee::where('company_id', $companyId)->get();
    }

   public function store(Request $request)
{
    $request->validate([
        'employeeId' => 'required|unique:employees,employeeId',
        'name' => 'required|string',
        'email' => 'required|email',
        'department' => 'nullable|string',
        'role' => 'nullable|string',
        'joiningDate' => 'nullable|date',
        'leaveDetails' => 'nullable|string',
        'salary' => 'nullable|numeric',
        'image' => 'nullable|image',
        'aadhar' => 'nullable|file',
        'pan' => 'nullable|file',
        'bankPassbook' => 'nullable|file',
        'educationCertificates.*' => 'nullable|file',
        'userEmail' => 'required|email',
    ]);

    // Save files
    $imagePath = $request->file('image')?->store('employees', 'public');
    $aadharPath = $request->file('aadhar')?->store('employees', 'public');
    $panPath = $request->file('pan')?->store('employees', 'public');
    $bankPassbookPath = $request->file('bankPassbook')?->store('employees', 'public');

    $eduCertPaths = [];
    if ($request->hasFile('educationCertificates')) {
        foreach ($request->file('educationCertificates') as $file) {
            $eduCertPaths[] = $file->store('employees', 'public');
        }
    }

    $employee = Employee::create([
        'employeeId' => $request->employeeId,
        'name' => $request->name,
        'email' => $request->email,
        'department' => $request->department,
        'role' => $request->role,
        'joiningDate' => $request->joiningDate,
        'leaveDetails' => $request->leaveDetails,
        'salary' => $request->salary,
        'image' => $imagePath,
        'aadhar' => $aadharPath,
        'pan' => $panPath,
        'bankPassbook' => $bankPassbookPath,
        'educationCertificates' => json_encode($eduCertPaths),
        'userEmail' => $request->userEmail,
    ]);

    return response()->json(['employee' => $employee]);
}


}
