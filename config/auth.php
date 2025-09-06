<?php

return [

    'defaults' => [
        'guard' => 'company',
        'passwords' => 'companies',
    ],

    'guards' => [
        'company' => [
            'driver' => 'session',
            'provider' => 'companies',
        ],
    ],

    'providers' => [
        'companies' => [
            'driver' => 'eloquent',
            'model' => App\Models\Company::class,
        ],
    ],

    'passwords' => [
        'companies' => [
            'provider' => 'companies',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),
];

