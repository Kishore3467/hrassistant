<!DOCTYPE html>
<html>
<head>
    <title>Leave Status Notification</title>
</head>
<body>
    <p>Dear {{ $name }},</p>
    <p>Your leave request for the dates {{ $dates }} has been <strong>{{ $status }}</strong>.</p>
    <p>Thank you,</p>
    <p>HR Team</p>
</body>
</html>
