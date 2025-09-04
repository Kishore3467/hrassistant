<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AIChatController;
use App\Http\Controllers\DocumentGeneratorController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\OfferLetterController;
use App\Http\Controllers\PolicyQAController;
use App\Http\Controllers\Api\PolicyQueryController;
use App\Http\Controllers\EmployeeOtpController;
use App\Http\Controllers\API\EmployeeOnboardingController;
use App\Http\Controllers\UserDocumentController;
use App\Http\Controllers\WhatsAppController;
use App\Http\Controllers\CoreHRUserController;
use App\Http\Controllers\API\StaffMemberController;
use App\Http\Controllers\Api\LeaveRequestController;
use App\Http\Controllers\Auth\CoreHRLoginController;
use App\Http\Controllers\API\ShiftController;
use App\Models\PerformanceEmployee;
use App\Http\Controllers\API\PerformanceEmployeeController;
use App\Http\Controllers\API\PerformanceGoalController;
use App\Http\Controllers\API\PayrollController;
use App\Http\Controllers\CorporatePolicyController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\LoginController;



use App\Http\Controllers\HRController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\EmailController;

// use App\Http\Controllers\EmployeeController;

use App\Http\Controllers\Auth\CompanyRegisterController;
use App\Http\Controllers\Auth\CompanyLoginController;

// routes/api.php
Route::get('/candidates', [CandidateController::class, 'index']);
Route::post('/candidates', [CandidateController::class, 'store']);

use App\Http\Controllers\Api\CandidateController;

Route::post('/candidates', [CandidateController::class, 'store'])
    ->withoutMiddleware([\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class])
    ->name('candidates.store');


// routes/api.php

use App\Http\Controllers\Api\EmployeeController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::post('/employees', [EmployeeController::class, 'store']);
    Route::put('/employees/{id}', [EmployeeController::class, 'update']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/shifts', [ShiftController::class, 'index']);
    Route::post('/shifts', [ShiftController::class, 'store']);
    Route::put('/shifts/{id}', [ShiftController::class, 'update']);
    Route::delete('/shifts/{id}', [ShiftController::class, 'destroy']);
});



use App\Http\Controllers\Api\OnboardingController;

Route::get('/onboardings', [OnboardingController::class, 'index']);   // public
Route::post('/onboardings', [OnboardingController::class, 'store']);  // public


Route::post('/candidates', [CandidateController::class, 'store'])->withoutMiddleware('auth:sanctum');
Route::get('/candidates', [CandidateController::class, 'index'])->withoutMiddleware('auth:sanctum');


Route::post('/login', [AuthController::class, 'login']);


Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::post('/employees', [EmployeeController::class, 'store']);
});



Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');


Route::post('/candidates', [CandidateController::class, 'store']);
Route::get('/candidates/{userEmail}', [CandidateController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/candidates', [CandidateController::class, 'store']);
    Route::get('/candidates', [CandidateController::class, 'index']);
});

Route::post('/register', [CompanyRegisterController::class, 'register']);
Route::post('/login', [CompanyLoginController::class, 'login']);

Route::post('/register', [CompanyRegisterController::class, 'register']);
Route::post('/login', [CompanyLoginController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::post('/employees', [EmployeeController::class, 'store']);
    Route::put('/employees/{id}', [EmployeeController::class, 'update']);
    Route::get('/employees/{id}', [EmployeeController::class, 'show']);
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
});


Route::post('/register', [RegisterController::class, 'register']);

Route::middleware('auth:sanctum')->get('/dashboard', function () {
    return response()->json(['message' => 'Welcome to dashboard']);
});

Route::middleware('auth')->get('/dashboard', function () {
    return view('dashboard'); // or return JSON
});



Route::post('/login', [LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);


Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/api/send-approval-email', function(Request $request) {
    // send email logic
    return response()->json(['success' => true, 'message' => 'Email sent']);
});

Route::post('/send-approval-email', [EmailController::class, 'sendApprovalEmail']);


Route::post('/send-approval-email', [EmailController::class, 'sendApprovalEmail']);

Route::post('/api/send-approval-email', [EmailController::class, 'sendApprovalEmail']);

Route::post('/send-approval-email', [MailController::class, 'sendApprovalEmail']);


Route::post('/send-approval-email', function(Request $request){
    $request->validate([
        'email' => 'required|email',
        'name' => 'required',
        'company' => 'required',
    ]);

    Mail::raw("Hi {$request->name},\n\nYou have been approved to access {$request->company}'s dashboard.\n\nLogin and start working!", function($message) use ($request){
        $message->to($request->email)
                ->subject("HR Approval Notification");
    });

    return response()->json(['success' => true]);
});

Route::post('/hr/approve/{empId}', [HRController::class, 'approveEmployee']);
Route::post('/hr/reject/{empId}', [HRController::class, 'rejectEmployee']);



Route::post('/employee/notify', [EmployeeController::class, 'notifyEmployee']);
Route::post('/employee/notify', [EmployeeController::class, 'notifyEmployee']);


Route::post('/signup', [SignupController::class, 'store']);
// routes/api.php
Route::post('/signup', [SignupController::class, 'store']);
Route::post('/login', [SignupController::class, 'login']);
Route::post('/check-user', [SignupController::class, 'checkUser']);




Route::get('/api/policies', [CorporatePolicyController::class, 'index']);
Route::get('/api/policies/download/{id}', [CorporatePolicyController::class, 'download']);


Route::get('/corporate-policies', [CorporatePolicyController::class, 'index']);
Route::get('/corporate-policies/{id}/download', [CorporatePolicyController::class, 'download']);


Route::get('/payrolls', [PayrollController::class, 'index']);
Route::post('/payrolls', [PayrollController::class, 'store']);
Route::put('/payrolls/{id}', [PayrollController::class, 'update']);
Route::delete('/payrolls/{id}', [PayrollController::class, 'destroy']);


Route::get('/employees', [PerformanceEmployeeController::class, 'index']);
Route::post('/employees', [PerformanceEmployeeController::class, 'store']);
Route::put('/employees/{employee}', [PerformanceEmployeeController::class, 'update']);
Route::delete('/employees/{employee}', [PerformanceEmployeeController::class, 'destroy']);

Route::get('/goals', [PerformanceGoalController::class, 'index']);
Route::post('/goals', [PerformanceGoalController::class, 'store']);
Route::put('/goals/{goal}', [PerformanceGoalController::class, 'update']);
Route::delete('/goals/{goal}', [PerformanceGoalController::class, 'destroy']);



Route::post('/aichat', [AIChatController::class, 'send']);
Route::post('/generate-document', [DocumentGeneratorController::class, 'generate']);
// Route::post('/offer-letter', [DocumentController::class, 'downloadOfferLetter']);
Route::post('/documents/offer-letter', [DocumentController::class, 'generateOfferLetter']);
Route::post('/offer-letter', [OfferLetterController::class, 'download']);
Route::post('/ask-policy', [PolicyQAController::class, 'ask']);
Route::post('/ask-policy', [PolicyQueryController::class, 'handle']);
Route::post('/ask-policy', [PolicyQueryController::class, 'ask']);
// Route::post('/ask-policy', [PolicyQueryController::class, 'askPolicy']);
// Route::post('/ask-policy', [PolicyQueryController::class, 'askPolicy']);
Route::post('/ask-policy', [PolicyQueryController::class, 'askPolicy']);
Route::post('/send-otp', [EmployeeOtpController::class, 'sendOtp']);
Route::post('/verify-otp', [EmployeeOtpController::class, 'verifyOtp']);
// routes/api.php
Route::post('/offer-letter', [OfferLetterController::class, 'download']);
Route::post('/offer-letter', [OfferLetterController::class, 'store']);
Route::get('/offer-letter/{aadhar}', [OfferLetterController::class, 'download']);
Route::post('/offer-letter', [OfferLetterController::class, 'generate']);
Route::post('/onboarding', [EmployeeOnboardingController::class, 'store']);
Route::post('/employee-onboarding', [EmployeeOnboardingController::class, 'store']);
Route::post('/employee-onboarding', [EmployeeOnboardingController::class, 'store']);
Route::get('/user-documents', [UserDocumentController::class, 'index']);
Route::get('/user-documents/{id}', [UserDocumentController::class, 'show']);
Route::post('/user-documents', [UserDocumentController::class, 'store']);
Route::post('/user-documents/{id}', [UserDocumentController::class, 'update']); // or PUT/PATCH
Route::delete('/user-documents/{id}', [UserDocumentController::class, 'destroy']);
Route::post('/upload-user-document', [UserDocumentController::class, 'upload']);
Route::post('/send-whatsapp', [WhatsAppController::class, 'sendMessage']);
Route::post('/aichat', [AIChatController::class, 'chat']);
Route::post('/aichat', [AIChatController::class, 'send']);
Route::post('/employee-onboarding', [EmployeeOnboardingController::class, 'store']);
Route::get('/corehr/users', [CoreHRUserController::class, 'listUsers']); // protected if needed
Route::post('/corehr-login', [CoreHRUserController::class, 'login']); // public
Route::post('/login', [CoreHRLoginController::class, 'login']);

Route::post('/login', [CoreHRLoginController::class, 'login']);

// Optional: Example protected route (needs token)
Route::middleware('auth:sanctum')->get('/corehr', function (Request $request) {
    return response()->json([
        'success' => true,
        'message' => 'Welcome to CoreHR Dashboard!',
        'user' => $request->user(),
    ]);
});

Route::prefix('staff')->group(function () {
    Route::get('/', [StaffMemberController::class, 'index']);
    Route::post('/', [StaffMemberController::class, 'store']);
    Route::post('/attendance', [StaffMemberController::class, 'updateAttendance']);
});
Route::post('/leave-requests', [LeaveRequestController::class, 'store']);
Route::get('/leave-requests', [LeaveRequestController::class, 'index']);
Route::put('/leave-requests/{id}', [LeaveRequestController::class, 'update']);
Route::post('/leave-requests', [LeaveRequestController::class, 'store']); 


Route::get('/shifts', [ShiftController::class, 'index']);
Route::post('/shifts', [ShiftController::class, 'store']);
Route::put('/shifts/{id}', [ShiftController::class, 'update']);
Route::delete('/shifts/{id}', [ShiftController::class, 'destroy']);

Route::get('/performance-employees', [PerformanceEmployeeController::class, 'index']);
Route::post('/performance-employees', [PerformanceEmployeeController::class, 'store']);
Route::delete('/performance-employees/{id}', [PerformanceEmployeeController::class, 'destroy']);

Route::get('/performance-employees', function () {
    return PerformanceEmployee::all();
});

