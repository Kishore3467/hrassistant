<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StaffMemberResource\Pages;
use App\Models\StaffMember;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;

class StaffMemberResource extends Resource
{
    protected static ?string $model = StaffMember::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Staff Members';
    protected static ?string $pluralModelLabel = 'Staff Members';
    protected static ?string $modelLabel = 'Staff Member';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('employee_id')
                    ->required()
                    ->maxLength(50),
                Forms\Components\Select::make('department')
                    ->options([
                        'Sales' => 'Sales',
                        'Marketing' => 'Marketing',
                        'Engineering' => 'Engineering',
                        'HR' => 'HR',
                        'Finance' => 'Finance',
                    ])
                    ->required(),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('employee_id')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('department')->sortable(),
                Tables\Columns\TextColumn::make('email')->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->label('Created'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('department')
                    ->options([
                        'Sales' => 'Sales',
                        'Marketing' => 'Marketing',
                        'Engineering' => 'Engineering',
                        'HR' => 'HR',
                        'Finance' => 'Finance',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStaffMembers::route('/'),
            'create' => Pages\CreateStaffMember::route('/create'),
            'edit' => Pages\EditStaffMember::route('/{record}/edit'),
        ];
    }
}
