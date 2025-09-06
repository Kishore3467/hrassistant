<!DOCTYPE html>
<html>
<head>
    <title>Shift Assigned</title>
</head>
<body>
    <h2>Hello {{ $shift['name'] }},</h2>
    <p>You have been assigned a new shift:</p>
    <ul>
        <li>Date: {{ $shift['date'] }}</li>
        <li>Time: {{ $shift['time'] }}</li>
        <li>Role: {{ $shift['role'] }}</li>
        <li>Status: {{ $shift['status'] }}</li>
    </ul>
    <p>Thank you!</p>
</body>
</html>
