<?php

namespace App\Http\Controllers;

use App\Models\CorporatePolicy;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class CorporatePolicyController extends Controller
{
    // Fetch all policies
  // app/Http/Controllers/CorporatePolicyController.php

public function index()
{
    return CorporatePolicy::all(['id', 'name', 'category', 'updated', 'file_path']);
}

public function download($id)
{
    $policy = CorporatePolicy::findOrFail($id);
    $filePath = $policy->file_path;

    if (\Storage::disk('public')->exists($filePath)) {
        return response()->download(storage_path("app/public/{$filePath}"));
    }

    return response()->json(['error' => 'File not found'], 404);
}

}
