<!-- resources/views/pdf/offer-letter.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Offer Letter</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; line-height: 1.5; }
        h1 { text-align: center; }
    </style>
</head>
<body>
    <h1>Offer Letter</h1>
    <p><strong>Name:</strong> {{ $employee->name }}</p>
    <p><strong>Role:</strong> {{ $employee->role }}</p>
    <p><strong>Aadhar Number:</strong> {{ $employee->aadhar_number }}</p>
    <p><strong>Joining Date:</strong> {{ $employee->joining_date }}</p>
    <p><strong>Working Hours:</strong> {{ $employee->working_hours }}</p>
    <p><strong>Salary:</strong> ₹{{ number_format($employee->salary, 2) }}</p>
    <p><strong>Company Name:</strong> {{ $employee->company_name }}</p>
    <p><strong>Company Address:</strong> {{ $employee->company_address }}</p>
    <br><br>
    <p>Welcome to our company. We look forward to working with you!</p>
</body>
</html>
