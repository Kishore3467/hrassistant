<!-- <!DOCTYPE html>
<html>
<head>
    <title>Offer Letter</title>
    <style>
        body { font-family: sans-serif; line-height: 1.5; }
    </style>
</head>
<body>
    <h2>Offer Letter</h2>

    <p><strong>Name:</strong> {{ $name }}</p>
    <p><strong>Role:</strong> {{ $role }}</p>
    <p><strong>Aadhar Number:</strong> {{ $aadhar }}</p>
    <p><strong>Joining Date:</strong> {{ $joining_date }}</p>
    <p><strong>Salary:</strong> ₹{{ $salary }}</p>
    <p><strong>Working Hours:</strong> {{ $working_hours }}</p>
    <p><strong>Company Name:</strong> {{ $company_name }}</p>
    <p><strong>Company Address:</strong> {{ $company_address }}</p>

    <br><br>
    <p>We are pleased to offer you the position of {{ $role }} at {{ $company_name }}.</p>
    <p>Please contact us if you have any questions.</p>

    <br>
    <p>Regards,</p>
    <p>HR Department</p>
</body>
</html> -->

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Offer Letter</title>
    <style>
        @page { margin: 40px; }
        body { 
            font-family: 'DejaVu Sans', sans-serif; 
            line-height: 1.6;
            margin: 0;
            color: #333;
            background-color: #fff;
        }
        .page-border {
            border: 4px solid #004080;
            padding: 30px;
            height: 100%;
            box-sizing: border-box;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #004080;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .logo {
            max-width: 120px;
            margin-bottom: 8px;
        }
        .company-details {
            font-size: 14px;
            color: #555;
        }
        h1 {
            color: #004080;
            text-align: center;
            margin-bottom: 25px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .details p {
            margin: 5px 0;
            font-size: 14px;
        }
        .content {
            margin-top: 20px;
            font-size: 15px;
            text-align: justify;
        }
        .signature {
            margin-top: 60px;
            font-size: 14px;
        }
        .footer {
            border-top: 2px solid #004080;
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 50px;
            padding-top: 8px;
        }
    </style>
</head>
<body>

<div class="page-border">
    <!-- HEADER -->
    <div class="header">
        <img src="{{ public_path('images/logo.jpg') }}" alt="Company Logo" class="logo">
        <div class="company-details">
            <strong>{{ $company_name }}</strong><br>
            {{ $company_address }}<br>
            Phone: +91-9876543210 | Email: hr@company.com
        </div>
    </div>

    <!-- TITLE -->
    <h1>Offer Letter</h1>

    <!-- DETAILS -->
    <div class="details">
        <p><strong>Name:</strong> {{ $name }}</p>
        <p><strong>Role:</strong> {{ $role }}</p>
        <p><strong>Aadhar Number:</strong> {{ $aadhar }}</p>
        <p><strong>Joining Date:</strong> {{ $joining_date }}</p>
        <p><strong>Salary:</strong> ₹{{ $salary }}</p>
        <p><strong>Working Hours:</strong> {{ $working_hours }}</p>
    </div>

    <!-- CONTENT -->
    <div class="content">
        <p>Dear {{ $name }},</p>
        <p>
            We are delighted to extend to you this formal offer of employment for the position 
            of <strong>{{ $role }}</strong> at <strong>{{ $company_name }}</strong>. Your selection 
            was based on your impressive skills, professionalism, and alignment with our core values.
        </p>
        <p>
            As discussed, your starting date will be <strong>{{ $joining_date }}</strong>, with working 
            hours from <strong>{{ $working_hours }}</strong>. You will receive a monthly salary of 
            ₹{{ $salary }}, along with other benefits as per company policy.
        </p>
        <p>
            We believe your expertise will be an asset to our team, and we look forward to 
            achieving great success together.
        </p>
        <p>
            Kindly sign and return a copy of this letter as a confirmation of your acceptance 
            of our offer.
        </p>
    </div>

    <!-- SIGNATURE -->
    <div class="signature">
        <p>Regards,</p>
        <p><strong>HR Department</strong><br>
        {{ $company_name }}</p>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        {{ $company_name }} | {{ $company_address }} | www.companywebsite.com
    </div>
</div>

</body>
</html>
