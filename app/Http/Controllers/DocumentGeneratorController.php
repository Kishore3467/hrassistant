<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocumentGeneratorController extends Controller
{
    public function generate(Request $request)
    {
        $type = strtolower($request->type ?? '');
        $name = $request->name ?? 'Employee Name';
        $position = $request->position ?? 'Position';
        $company = $request->company ?? 'Company';

        $content = $this->getTemplate($type, $name, $position, $company);

        return response()->json([
            'document' => $content
        ]);
    }

    private function getTemplate($type, $name, $position, $company)
    {
        if ($type === 'job description') {
            return "Job Description for {$position} at {$company}:\n\nResponsibilities:\n- ...\n\nQualifications:\n- ...";
        }
        if ($type === 'offer letter') {
            return "Dear {$name},\n\nWe are pleased to offer you the position of {$position} at {$company}.\n\nRegards,\nHR Department";
        }
        if ($type === 'nda') {
            return "NDA Agreement between {$name} and {$company}...\n\nSigned,\nHR Department";
        }
        return "Unknown document type.";
    }
}
