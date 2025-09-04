<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf; // Make sure dompdf is installed

class PolicyController extends Controller
{
    public function askPolicy(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:1000',
        ]);

        $question = $request->input('question');

        // Prepare dynamic PDF content
        $pdf = Pdf::loadView('pdf.policy', [
            'question' => $question,
            'date' => now()->format('Y-m-d')
        ]);

        // Return the PDF as a download
        return $pdf->download('policy-response-' . now()->format('Y-m-d') . '.pdf');
    }
}
