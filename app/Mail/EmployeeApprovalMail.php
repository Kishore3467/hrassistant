<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmployeeApprovalMail extends Mailable
{
    use Queueable, SerializesModels;

    public $employeeName;
    public $companyName;

    public function __construct($employeeName, $companyName)
    {
        $this->employeeName = $employeeName;
        $this->companyName = $companyName;
    }

    public function build()
    {
        return $this->subject('Your Account Has Been Approved')
                    ->markdown('emails.employee_approval');
    }
}
