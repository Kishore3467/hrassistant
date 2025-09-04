<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HRController extends Controller
{
    public function approveEmployee($empId)
{
    $employee = Employee::find($empId);

    if (!$employee) {
        return response()->json(['error' => 'Employee not found'], 404);
    }

    $employee->approved = true;
    $employee->save();

    // Send email to employee
    Mail::to($employee->email)->send(new EmployeeApprovalMail($employee, "Approved"));

    return response()->json(['message' => 'Employee approved & email sent']);
}

public function rejectEmployee($empId)
{
    $employee = Employee::find($empId);

    if (!$employee) {
        return response()->json(['error' => 'Employee not found'], 404);
    }

    $employee->approved = false;
    $employee->save();

    // Send email to employee
    Mail::to($employee->email)->send(new EmployeeApprovalMail($employee, "Rejected"));

    return response()->json(['message' => 'Employee rejected & email sent']);
}

}
