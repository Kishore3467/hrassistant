<!DOCTYPE html>
<html>
<head>
    <title>HR Approval Status</title>
</head>
<body>
    <p>Hello {{ $employee->name }},</p>
    <p>Your request has been <strong>{{ $status }}</strong> by HR.</p>
    <p>Thanks, <br> HR Team</p>
</body>
</html>
