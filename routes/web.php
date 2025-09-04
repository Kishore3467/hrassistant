<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;


// Send all frontend routes to React (handled inside welcome.blade.php)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::get('/test-mail', function() {
    Mail::raw("This is a test email from HR Copilot.", function($message){
        $message->to('recipient@example.com')
                ->subject('Test Email');
    });
    return "Mail sent!";
});

Route::middleware('auth')->get('/dashboard', function () {
    return response()->json([
        'message' => 'Welcome to dashboard!',
        'user' => auth()->user(),
    ]);
});
