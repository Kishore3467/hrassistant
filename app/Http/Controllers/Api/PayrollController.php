<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payroll;
use Illuminate\Http\Request;

class PayrollController extends Controller
{
    public function index()
    {
        return response()->json(Payroll::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'employee_id' => 'required|unique:payrolls,employee_id',
            'position' => 'required|string',
            'department' => 'required|string',
            'join_date' => 'required|date',
            'salary' => 'required|numeric',
            'bonus' => 'required|numeric',
            'deductions' => 'required|numeric',
            'status' => 'required|in:Active,Inactive',
        ]);

        $payroll = Payroll::create($validated);
        return response()->json($payroll, 201);
    }

    public function update(Request $request, $id)
    {
        $payroll = Payroll::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string',
            'employee_id' => 'required|unique:payrolls,employee_id,' . $payroll->id,
            'position' => 'required|string',
            'department' => 'required|string',
            'join_date' => 'required|date',
            'salary' => 'required|numeric',
            'bonus' => 'required|numeric',
            'deductions' => 'required|numeric',
            'status' => 'required|in:Active,Inactive',
        ]);

        $payroll->update($validated);
        return response()->json($payroll);
    }

    public function destroy($id)
    {
        $payroll = Payroll::findOrFail($id);
        $payroll->delete();
        return response()->json(['message' => 'Payroll record deleted']);
    }
}
