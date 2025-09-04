<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = strtolower($request->message);
        $response = "I'm not sure about that. Please contact HR.";

        // Rule-based replies
        if (str_contains($userMessage, 'leave')) {
            $response = "You can apply for leave in the HR Portal. Paid leave is 20 days/year.";
        } elseif (str_contains($userMessage, 'payroll')) {
            $response = "Payroll is processed on the last working day of the month.";
        } elseif (str_contains($userMessage, 'policy')) {
            $response = "You can find all HR policies here: /hr-policies";
        } elseif (str_contains($userMessage, 'onboarding')) {
            $response = "Welcome! Your onboarding steps are in your HR Copilot dashboard.";
        }

        return response()->json([
            'reply' => $response
        ]);
    }
}
