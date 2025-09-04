<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendApprovalEmail(Request $request)
    {
        $data = $request->only('email', 'name', 'company', 'message');

        try {
            Mail::raw($data['message'] ?? "Hello {$data['name']}", function ($message) use ($data) {
                $message->to($data['email'])
                        ->subject('Approval Notification');
            });

            return response()->json([
                'success' => true,
                'message' => 'Email sent successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
