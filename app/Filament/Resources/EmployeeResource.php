<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmployeeResource\Pages;
use App\Models\Employee;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Resource;

use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;

class EmployeeResource extends Resource
{
    protected static ?string $model = Employee::class;
protected static ?int $navigationSort = 2;
    protected static ?string $navigationGroup = 'EMPLOYEE OFFER LETTER';
    protected static ?string $navigationIcon = 'heroicon-o-user-group';  

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')->required(),
            TextInput::make('role')->required(),
            TextInput::make('aadhar_number')->required()->maxLength(12),
            Forms\Components\DatePicker::make('joining_date')->required(),
            TextInput::make('working_hours')->required(),
            TextInput::make('salary')->numeric()->required(),
            TextInput::make('company_name')->required(),
            Forms\Components\Textarea::make('company_address'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('name')->searchable(),
            TextColumn::make('role'),
            TextColumn::make('aadhar_number'),
            TextColumn::make('joining_date')->date(),
            TextColumn::make('salary')->money('INR'),
            TextColumn::make('company_name'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEmployees::route('/'),
            'create' => Pages\CreateEmployee::route('/create'),
            'edit' => Pages\EditEmployee::route('/{record}/edit'),
        ];
    }
}
