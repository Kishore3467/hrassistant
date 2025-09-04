<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PerformanceEmployee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PerformanceEmployeeController extends Controller
{
    // Get all performance employees
    public function index()
    {
        $employees = PerformanceEmployee::all();
        return response()->json($employees, 200);
    }

    // Store a new performance employee
    public function store(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|unique:performance_employees,employee_id',
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'rating' => 'required|numeric|min:0|max:5',
            'last_review' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create employee
        $employee = PerformanceEmployee::create([
            'employee_id' => $request->employee_id,
            'name' => $request->name,
            'role' => $request->role,
            'department' => $request->department,
            'rating' => $request->rating,
            'last_review' => $request->last_review,
        ]);

        return response()->json([
            'message' => 'Employee added successfully',
            'employee' => $employee
        ], 201);
    }

    // Delete performance employee
    public function destroy($id)
    {
        $employee = PerformanceEmployee::where('employee_id', $id)->first();

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
