<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmployeeOnboardingResource\Pages;
use App\Models\EmployeeOnboarding;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\DatePicker;

class EmployeeOnboardingResource extends Resource
{
    protected static ?string $model = EmployeeOnboarding::class;
    protected static ?int $navigationSort = 2;
    protected static ?string $navigationGroup = 'ONBOARDING FORM DATA';
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Employee Onboarding';

   public static function form(Form $form): Form
{
    return $form
        ->schema([
            TextInput::make('fullName')->required(),
            TextInput::make('email')->email()->required(),
            TextInput::make('phone')->required(),
            Textarea::make('address')->required(),
            DatePicker::make('dateOfBirth')->required(),
            TextInput::make('emergencyContactName')->required(),
            TextInput::make('emergencyContactPhone')->required(),
            Textarea::make('education'),
            Textarea::make('experience'),
            TextInput::make('bankName'),
            TextInput::make('accountNumber'),
            TextInput::make('ifscCode'),
            TextInput::make('companyEmail')->email(),
            TextInput::make('laptopSerial'),
            TextInput::make('kitStatus'),
            DatePicker::make('joiningDate'),
            TextInput::make('department'),
            TextInput::make('designation'),
            TextInput::make('employeeId'),
            TextInput::make('workLocation'),
            TextInput::make('probationPeriod'),
            TextInput::make('reportingManager'),
            Textarea::make('additionalNotes'),
        ]);
}


   public static function getPages(): array
{
    return [
        'index' => Pages\ListEmployeeOnboardings::route('/'),
        'create' => Pages\CreateEmployeeOnboarding::route('/create'),
        'edit' => Pages\EditEmployeeOnboarding::route('/{record}/edit'),
        'view' => Pages\ViewEmployeeOnboarding::route('/{record}'),
    ];
}

}
