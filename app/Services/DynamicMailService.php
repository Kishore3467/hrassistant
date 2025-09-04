<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;

class DynamicMailService
{
    public static function send($company, $mailable, $to)
    {
        // Configure mail dynamically from company settings
        $mailConfig = [
            'transport' => 'smtp',
            'host' => $company->mail_host ?? config('mail.mailers.smtp.host'),
            'port' => $company->mail_port ?? config('mail.mailers.smtp.port'),
            'username' => $company->mail_username ?? config('mail.mailers.smtp.username'),
            'password' => $company->mail_password ?? config('mail.mailers.smtp.password'),
            'encryption' => $company->mail_encryption ?? config('mail.mailers.smtp.encryption'),
        ];

        // Set at runtime
        Config::set('mail.mailers.smtp', $mailConfig);
        Config::set('mail.from.address', $company->mail_from_address ?? config('mail.from.address'));
        Config::set('mail.from.name', $company->mail_from_name ?? config('mail.from.name'));

        // Send mail
        Mail::to($to)->send($mailable);
    }
}
