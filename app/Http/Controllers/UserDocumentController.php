<?php

namespace App\Http\Controllers;

use App\Models\UserDocument;
use Illuminate\Http\Request;

class UserDocumentController extends Controller
{
    public function upload(Request $request)
{
    $request->validate([
        'type' => 'required|string',
        'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:10240', // max 10MB
    ]);

    $path = $request->file('file')->store('user_documents', 'public');

    $document = UserDocument::create([
        'user_id' => auth()->id() ?? null,
        'type' => $request->type,
        'file_path' => $path,
    ]);

    return response()->json([
        'message' => 'File uploaded successfully',
        'document' => $document,
    ]);
}

}
