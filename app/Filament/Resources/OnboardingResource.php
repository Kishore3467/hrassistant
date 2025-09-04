<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OnboardingResource\Pages;
use App\Models\Onboarding;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\Resource;

class OnboardingResource extends Resource
{
    protected static ?string $model = Onboarding::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Onboardings';
    protected static ?string $pluralLabel = 'Onboardings';
    protected static ?string $modelLabel = 'Onboarding';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\Select::make('company_id')
                ->relationship('company', 'name')
                ->label('Company')
                ->required(),

            Forms\Components\TextInput::make('employee_name')
                ->label('Employee Name')
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('employee_email')
                ->email()
                ->label('Employee Email')
                ->required(),

            Forms\Components\TextInput::make('designation')
                ->label('Designation')
                ->maxLength(255),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('company.name')->label('Company'),
            Tables\Columns\TextColumn::make('employee_name')->label('Employee'),
            Tables\Columns\TextColumn::make('employee_email'),
            Tables\Columns\TextColumn::make('designation'),
            Tables\Columns\TextColumn::make('created_at')->dateTime(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOnboardings::route('/'),
            'create' => Pages\CreateOnboarding::route('/create'),
            'edit' => Pages\EditOnboarding::route('/{record}/edit'),
        ];
    }
}
