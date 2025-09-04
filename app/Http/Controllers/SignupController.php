<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signup;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class SignupController extends Controller
{
   public function store(Request $request)
{
    $validated = $request->validate([
    'name'     => 'required|string|max:255',
    'email'    => 'required|email|unique:signups',
    'password' => 'required|string|min:6',
    'phone'    => 'required|string|max:15',
]);


    $signup = Signup::create([
        'name'     => $validated['name'],
        'email'    => $validated['email'],
        'password' => Hash::make($validated['password']),
        'phone'    => $validated['phone'],
    ]);

    // Auto login (if you want)
    Auth::login($signup);

    return response()->json([
        'message' => 'Signup successful',
        'redirect' => '/welcome', // pass redirect route
        'data' => $signup,
    ]);
}
}
