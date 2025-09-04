<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatBotController extends Controller
{
    public function chat(Request $request)
    {
        $message = $request->input('message');

        // Simple static reply for now
        return response()->json([
            'reply' => "You said: {$message} (Basic HR Bot Reply)"
        ]);
    }
}
