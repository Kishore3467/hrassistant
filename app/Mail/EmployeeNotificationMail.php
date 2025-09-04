<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmployeeNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $employee;
    public $messageContent;

    public function __construct($employee, $messageContent)
    {
        $this->employee = $employee;
        $this->messageContent = $messageContent;
    }

    public function build()
    {
        return $this->subject("Notification for {$this->employee->name}")
                    ->view('emails.employee_notification');
    }
}
