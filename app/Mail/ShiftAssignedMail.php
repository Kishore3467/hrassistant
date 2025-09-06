<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Shift;

class ShiftAssigned extends Mailable
{
    use Queueable, SerializesModels;

    public $shift;

    public function __construct(Shift $shift)
    {
        $this->shift = $shift;
    }

    public function build()
    {
        return $this->subject('New Shift Assigned')
                    ->markdown('emails.shift.assigned')
                    ->with([
                        'shift' => $this->shift,
                    ]);
    }
}
