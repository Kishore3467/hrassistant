<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LeaveStatusNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $status;
    public $dates;

    public function __construct($name, $status, $dates)
    {
        $this->name = $name;
        $this->status = $status;
        $this->dates = $dates;
    }

    public function build()
    {
        return $this->subject("Your Leave Request has been {$this->status}")
                    ->view('emails.leave-status-notification');
    }
}
