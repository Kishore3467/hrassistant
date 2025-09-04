<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ShiftResource\Pages;
use App\Models\Shift;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ShiftResource extends Resource
{
    protected static ?string $model = Shift::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';
    protected static ?string $navigationLabel = 'Shifts';
    protected static ?string $pluralLabel = 'Shifts';
    protected static ?string $navigationGroup = 'Shift Management';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\DatePicker::make('date')
                    ->required(),

                Forms\Components\TextInput::make('name')
                    ->label('Employee Name')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('employee_id')
                    ->label('Employee ID')
                    ->maxLength(50),

               Forms\Components\Select::make('time')
    ->label('Shift Time')
    ->options([
        '06:00 AM - 02:00 PM' => '06:00 AM - 02:00 PM',
        '02:00 PM - 11:00 PM' => '02:00 PM - 11:00 PM',
        '11:00 PM - 06:00 AM' => '11:00 PM - 06:00 AM',
    ])
    ->required(),

                Forms\Components\Select::make('role')
                    ->options([
                        'Cashier' => 'Cashier',
                        'Manager' => 'Manager',
                        'Supervisor' => 'Supervisor',
                        'Staff' => 'Staff',
                    ])
                    ->required(),

                Forms\Components\Select::make('status')
                    ->options([
                        'Assigned' => 'Assigned',
                        'Completed' => 'Completed',
                        'Cancelled' => 'Cancelled',
                    ])
                    ->default('Assigned')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable(),

                Tables\Columns\TextColumn::make('name')
                    ->label('Employee Name')
                    ->searchable(),

                Tables\Columns\TextColumn::make('employee_id')
                    ->label('Employee ID')
                    ->searchable(),

                Tables\Columns\TextColumn::make('time'),

                Tables\Columns\TextColumn::make('role'),

                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'success' => 'Assigned',
                        'danger' => 'Cancelled',
                        'warning' => 'Completed',
                    ]),
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
            'index' => Pages\ListShifts::route('/'),
            'create' => Pages\CreateShift::route('/create'),
            'edit' => Pages\EditShift::route('/{record}/edit'),
        ];
    }
}
