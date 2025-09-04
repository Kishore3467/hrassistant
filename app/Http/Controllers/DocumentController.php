<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class DocumentController extends Controller
{
    public function downloadOfferLetter(Request $request)
    {
        // Validate request
        $data = $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'joining_date' => 'required|date',
            'working_hours' => 'required|string',
            'salary' => 'required|string',
            'company_name' => 'required|string',
        ]);

        // Create HTML content for PDF
        $html = view('documents.offer_letter', $data)->render();

        // Generate PDF
        $pdf = Pdf::loadHTML($html);

        // Download as file
        return $pdf->download("Offer_Letter_{$data['name']}.pdf");
    }
}
