<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI;

class AIChatController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string',
        ]);

        try {
            $client = OpenAI::client(env('OPENAI_API_KEY'));

            $response = $client->completions()->create([
                'model' => 'text-davinci-003',
                'prompt' => $request->prompt,
                'max_tokens' => 150,
            ]);

            return response()->json([
                'response' => $response->choices[0]->text,
            ]);
        } catch (\Exception $e) {
            \Log::error('OpenAI API error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
