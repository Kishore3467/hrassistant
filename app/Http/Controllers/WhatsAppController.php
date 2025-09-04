<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

class WhatsAppController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'to' => 'required|string',       // Phone number with country code, e.g., 919876543210
            'message' => 'required|string',
        ]);

        $sid = config('services.twilio.sid');
        $token = config('services.twilio.token');
        $from = config('services.twilio.whatsapp_from');
        $client = new Client($sid, $token);

        try {
            $client->messages->create(
                "whatsapp:+" . $request->to,
                [
                    'from' => $from,
                    'body' => $request->message,
                ]
            );

            return response()->json(['success' => true, 'message' => 'WhatsApp message sent.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
