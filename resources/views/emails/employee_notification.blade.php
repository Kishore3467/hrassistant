<!DOCTYPE html>
<html>
<head>
    <title>Employee Notification</title>
</head>
<body>
    <h2>Hello {{ $employee->name }},</h2>
    <p>{{ $messageContent }}</p>
    <br>
    <p>Thanks,<br>{{ config('mail.from.name') }}</p>
</body>
</html>
