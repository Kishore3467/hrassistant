<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CompanyRegisterController extends Controller
{
   public function register(Request $request){
    $request->validate([
        'name'=>'required',
        'email'=>'required|email|unique:companies',
        'password'=>'required|min:6',
        'phone'=>'required',
    ]);

    // During registration
$company = Company::create([
    'name' => $request->name,
    'email' => $request->email,
    'phone' => $request->phone,
    'password' => Hash::make($request->password), // ✅ MUST hash
]);


    \Auth::guard('company')->login($company);

    return response()->json([
        'message'=>'Signup successful',
        'user'=>$company
    ]);
}


}
