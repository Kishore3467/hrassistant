<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PolicyDocument;
use OpenAI\Laravel\Facades\OpenAI;

class PolicyQAController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:255',
        ]);

        $policy = PolicyDocument::latest()->first();

        if (!$policy || !$policy->parsed_text) {
            return response()->json(['error' => 'No policy available'], 404);
        }

        $prompt = "Based on the following HR policy document, answer the question below. Only respond using content from the document.

Policy:
{$policy->parsed_text}

Question:
{$request->question}
";

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        return response()->json([
            'answer' => $response->choices[0]->message->content,
        ]);
    }
}

