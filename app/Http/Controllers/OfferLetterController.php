<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class OfferLetterController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'aadhar_number' => 'required|string',
        ]);

        $employee = Employee::where('name', $request->name)
            ->where('role', $request->role)
            ->where('aadhar_number', $request->aadhar_number)
            ->first();

        if (!$employee) {
            return response()->json([
                'error' => 'Aadhar number is not matched. You are not shortlisted.'
            ], 404);
        }

        $data = [
            'name' => $employee->name,
            'role' => $employee->role,
            'aadhar' => $employee->aadhar_number,
            'joining_date' => $employee->joining_date,
            'salary' => $employee->salary,
            'working_hours' => $employee->working_hours,
            'company_name' => $employee->company_name,
            'company_address' => $employee->company_address,
        ];

        $pdf = Pdf::loadView('offer-letter', $data);

        return $pdf->download('Offer_Letter_' . $employee->name . '.pdf');
    }
}
