<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift;
use App\Models\Employee;
use Illuminate\Support\Facades\Mail;
use App\Mail\ShiftAssigned;

class ShiftController extends Controller
{
    // Get all shifts (optional: filtered by user)
    public function index(Request $request)
    {
        // You can filter by current user if needed
        $shifts = Shift::all();
        return response()->json($shifts, 200);
    }

    // Store a new shift
    public function store(Request $request)
    {
        // Validate request
        $request->validate([
            'date' => 'required|date',
            'name' => 'required|string',
            'time' => 'required|string',
            'role' => 'required|string',
            'status' => 'required|string',
            'employee_id' => 'required|exists:employees,id',
        ]);

        // Create shift
        $shift = Shift::create([
            'date' => $request->date,
            'name' => $request->name,
            'time' => $request->time,
            'role' => $request->role,
            'status' => $request->status,
            'employee_id' => $request->employee_id,
        ]);

        // Send email to employee
        $employee = Employee::find($request->employee_id);
        if ($employee && $employee->email) {
            Mail::to($employee->email)->send(new ShiftAssigned($shift));
        }

        return response()->json([
            'message' => 'Shift assigned successfully',
            'shift' => $shift
        ], 201);
    }

    // Optional: update shift
    public function update(Request $request, $id)
    {
        $shift = Shift::findOrFail($id);
        $shift->update($request->all());
        return response()->json($shift, 200);
    }

    // Optional: delete shift
    public function destroy($id)
    {
        $shift = Shift::findOrFail($id);
        $shift->delete();
        return response()->json(['message' => 'Shift deleted'], 200);
    }
}
