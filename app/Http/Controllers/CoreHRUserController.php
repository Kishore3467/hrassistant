<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\CoreHRUser;

class CoreHRUserController extends Controller
{
    // API for login
    public function login(Request $request)
    {
        // Validate request
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        // Find user in DB
        $user = CoreHRUser::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password'], 401);
        }

        // Success
        return response()->json([
            'message' => 'Login successful',
            'user'    => $user
        ]);
    }
}
