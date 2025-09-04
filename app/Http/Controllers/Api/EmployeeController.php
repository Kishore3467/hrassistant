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
            'name'  => 'required',
            'email' => 'nullable|email',
            'phone' => 'nullable',
        ]);

        $employee = Employee::create([
            'name'       => $request->name,
            'email'      => $request->email,
            'phone'      => $request->phone,
            'company_id' => $request->user()->company_id,
        ]);

        return response()->json($employee, 201);
    }
}
