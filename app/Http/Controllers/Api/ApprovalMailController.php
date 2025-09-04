<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmployeeApprovalMail;

class ApprovalMailController extends Controller
{
    public function sendApprovalEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
            'company' => 'required|string',
        ]);

        try {
            Mail::to($request->email)->send(new EmployeeApprovalMail($request->name, $request->company));
            return response()->json(['success' => true, 'message' => 'Email sent successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Email sending failed', 'error' => $e->getMessage()]);
        }
    }
}
