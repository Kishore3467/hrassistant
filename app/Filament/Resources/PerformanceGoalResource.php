<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PerformanceGoalResource\Pages;
use App\Models\PerformanceGoal;
use App\Models\PerformanceEmployee;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PerformanceGoalResource extends Resource
{
    protected static ?string $model = PerformanceGoal::class;

    protected static ?string $navigationIcon = 'heroicon-o-flag';
    protected static ?string $navigationLabel = 'Performance Goals';
    protected static ?string $pluralModelLabel = 'Performance Goals';
    protected static ?string $modelLabel = 'Performance Goal';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Goal Title')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('progress')
                    ->label('Progress (%)')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->default(0)
                    ->required(),

                Forms\Components\DatePicker::make('deadline')
                    ->label('Deadline')
                    ->required(),

                Forms\Components\Select::make('employees')
                    ->label('Assigned Employees')
                    ->multiple()
                    ->relationship('employees', 'name')
                    ->preload()
                    ->searchable()
                    ->placeholder('Select Employees'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Goal Title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('progress')
                    ->label('Progress (%)')
                    ->sortable(),

                Tables\Columns\TextColumn::make('deadline')
                    ->date('d M Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('employees.name')
                    ->label('Assigned Employees')
                    ->listWithLineBreaks()
                    ->limit(50),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('employees')
                    ->label('Filter by Employee')
                    ->relationship('employees', 'name'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManagePerformanceGoals::route('/'),
        ];
    }
}
