<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PerformanceEmployeeResource\Pages;
use App\Models\PerformanceEmployee;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\Resource;

class PerformanceEmployeeResource extends Resource
{
    protected static ?string $model = PerformanceEmployee::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Performance Employees';
    protected static ?string $navigationGroup = 'Employee Management';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('employee_id')
                ->label('Employee ID')
                ->required()
                ->maxLength(50),

            Forms\Components\TextInput::make('name')
                ->label('Name')
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('role')
                ->label('Role')
                ->required(),

            Forms\Components\TextInput::make('department')
                ->label('Department')
                ->required(),

            Forms\Components\TextInput::make('rating')
                ->label('Rating')
                ->numeric()
                ->minValue(0)
                ->maxValue(10),

            Forms\Components\DatePicker::make('last_review')
                ->label('Last Review Date'),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('employee_id')->sortable()->searchable(),
            Tables\Columns\TextColumn::make('name')->sortable()->searchable(),
            Tables\Columns\TextColumn::make('role')->sortable(),
            Tables\Columns\TextColumn::make('department')->sortable(),
            Tables\Columns\TextColumn::make('rating')->sortable(),
            Tables\Columns\TextColumn::make('last_review')->date()->sortable(),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
        ])
        ->filters([])
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
            'index' => Pages\ManagePerformanceEmployees::route('/'),
        ];
    }
}
