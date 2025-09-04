<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CoreHRUserResource\Pages;
use App\Models\CoreHRUser;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CoreHRUserResource extends Resource
{
    protected static ?string $model = CoreHRUser::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'CoreHR Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true),
                Forms\Components\TextInput::make('password')
                    ->password()
                    ->required()
                    ->dehydrateStateUsing(fn ($state) => \Hash::make($state))
                    ->dehydrated(fn ($state) => filled($state))
                    ->label('Password'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('created_at')->dateTime(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCoreHRUsers::route('/'),
            'create' => Pages\CreateCoreHRUser::route('/create'),
            'edit' => Pages\EditCoreHRUser::route('/{record}/edit'),
        ];
    }
}
