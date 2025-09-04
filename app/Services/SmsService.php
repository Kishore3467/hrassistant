<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SmsService
{
    public static function sendOtp($mobile, $otp)
    {
        $authKey = env('MSG91_AUTH_KEY');
        $senderId = env('MSG91_SENDER_ID', 'ROYALU');
        $route = env('MSG91_ROUTE', '4');
        $country = env('MSG91_COUNTRY', '91');

        $message = "Your OTP for RoyalTranscript offer letter is: $otp";

        $response = Http::get('https://control.msg91.com/api/sendhttp.php', [
            'authkey' => $authKey,
            'mobiles' => $mobile,
            'message' => $message,
            'sender' => $senderId,
            'route' => $route,
            'country' => $country,
        ]);

        if (!$response->successful()) {
            \Log::error('MSG91 Send OTP Failed', ['response' => $response->body()]);
        }

        return $response->body();
    }
}
