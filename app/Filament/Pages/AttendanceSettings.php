<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Form;
use Filament\Forms\Components\Toggle;

class AttendanceSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog';

    public function form(Form $form): Form
    {
        return $form->schema([
            Toggle::make('enable_attendance')->label('Enable Attendance'),
        ]);
    }
}
