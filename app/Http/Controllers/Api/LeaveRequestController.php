<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LeaveRequest;

class LeaveRequestController extends Controller
{
    // Fetch all leave requests
    public function index()
    {
        $leaveRequests = LeaveRequest::orderBy('created_at', 'desc')->get();
        return response()->json($leaveRequests);
    }

    // Store new leave request
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'date' => 'required|date',
            'endDate' => 'required|date',
            'subject' => 'required|string',
            'reason' => 'required|string',
            'leaveType' => 'required|string',
        ]);

        $leaveRequest = LeaveRequest::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'date' => $validated['date'],
            'end_date' => $validated['endDate'],
            'subject' => $validated['subject'],
            'reason' => $validated['reason'],
            'leave_type' => $validated['leaveType'],
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Leave request submitted successfully',
            'data' => $leaveRequest
        ], 201);
    }

    // Update leave request status
    public function update(Request $request, $id)
{
    $leaveRequest = LeaveRequest::find($id);
    if (!$leaveRequest) {
        return response()->json(['error' => 'Leave request not found'], 404);
    }

    // Validate request
    $request->validate([
        'status' => 'required|in:Pending,Approved,Rejected'
    ]);

    // Update status
    $leaveRequest->status = $request->status;
    $leaveRequest->save();

    return response()->json($leaveRequest);
}


}
