<?php

// app/Http/Controllers/API/StaffMemberController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StaffMember;
use App\Models\StaffAttendance;
use Illuminate\Support\Facades\Validator;

class StaffMemberController extends Controller
{
    // List all staff with attendance for a given month
    public function index(Request $request)
    {
        $year = $request->year ?? now()->year;
        $month = $request->month ?? now()->month;

        $staff = StaffMember::with(['attendance' => function ($q) use ($year, $month) {
            $q->whereYear('date', $year)->whereMonth('date', $month);
        }])->get();

        return response()->json($staff);
    }

    // Add new staff
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'employee_id' => 'required|string|unique:staff_members,employee_id',
            'department' => 'required|string',
            'email' => 'nullable|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()], 422);
        }

        $staff = StaffMember::create($request->all());
        return response()->json($staff);
    }

    // Update attendance
   public function updateAttendance(Request $request)
{
    $validator = Validator::make($request->all(), [
        'staff_member_id' => 'required|exists:staff_members,id',
        'date' => 'required|date',
        'status' => 'required|in:P,A',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Fetch the staff name
    $staff = StaffMember::findOrFail($request->staff_member_id);

    // Update or create attendance and include the staff name
    $attendance = StaffAttendance::updateOrCreate(
        ['staff_member_id' => $staff->id, 'date' => $request->date],
        [
            'status' => $request->status,
            'staff_name' => $staff->name, // store name here
        ]
    );

    return response()->json($attendance);
}


}
