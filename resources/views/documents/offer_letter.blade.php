<!DOCTYPE html>
<html>
<head>
    <title>Offer Letter</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 30px; }
        h1 { color: #333; }
        p { line-height: 1.6; }
    </style>
</head>
<body>
    <h1>Offer Letter</h1>
    <p>Dear {{ $employee->name }},</p>

    <p>We are pleased to offer you the position of <strong>{{ $employee->role }}</strong> at <strong>{{ $employee->company_name }}</strong>.</p>

    <p>Your joining date is <strong>{{ \Carbon\Carbon::parse($employee->joining_date)->format('F d, Y') }}</strong>, and your working hours will be <strong>{{ $employee->working_hours }}</strong> per week. Your salary will be <strong>₹{{ number_format($employee->salary, 2) }}</strong> per annum.</p>

    <p>Please report to our office located at <strong>{{ $employee->company_address }}</strong> on the joining date.</p>

    <p>We look forward to working with you.</p>

    <p>Sincerely,<br>
    <strong>{{ $employee->company_name }}</strong></p>
</body>
</html>
