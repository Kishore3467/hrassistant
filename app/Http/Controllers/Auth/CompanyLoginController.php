<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanyLoginController extends Controller
{ 
    public function login(Request $request){
    $request->validate([
        'email'=>'required|email',
        'password'=>'required|string',
    ]);

    if(\Auth::guard('company')->attempt($request->only('email','password'))){
        $company = \Auth::guard('company')->user();
        return response()->json([
            'message'=>'Login successful',
            'user'=>$company
        ]);
    }

    return response()->json(['message'=>'Invalid credentials'],401);
}


}
