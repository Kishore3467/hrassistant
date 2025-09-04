<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PayrollResource\Pages;
use App\Models\Payroll;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables;

class PayrollResource extends Resource
{
    protected static ?string $model = Payroll::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\TextInput::make('employee_id')->required()->unique(ignoreRecord: true),
                Forms\Components\TextInput::make('position')->required(),
                Forms\Components\Select::make('department')
                    ->options([
                        'Engineering' => 'Engineering',
                        'Design' => 'Design',
                        'Human Resources' => 'Human Resources',
                        'Marketing' => 'Marketing',
                        'Finance' => 'Finance',
                    ])
                    ->required(),
                Forms\Components\DatePicker::make('join_date')->required(),
                Forms\Components\TextInput::make('salary')->numeric()->required(),
                Forms\Components\TextInput::make('bonus')->numeric()->required(),
                Forms\Components\TextInput::make('deductions')->numeric()->required(),
                Forms\Components\TextInput::make('net_pay')->numeric()->disabled(),
                Forms\Components\Select::make('status')
                    ->options(['Active' => 'Active', 'Inactive' => 'Inactive'])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('employee_id')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('department')->sortable(),
                Tables\Columns\TextColumn::make('position')->sortable(),
                Tables\Columns\TextColumn::make('join_date')->date()->sortable(),
                Tables\Columns\TextColumn::make('salary')->money('INR', true),
                Tables\Columns\TextColumn::make('bonus')->money('INR', true),
                Tables\Columns\TextColumn::make('deductions')->money('INR', true),
                Tables\Columns\TextColumn::make('net_pay')->money('INR', true),
                Tables\Columns\TextColumn::make('status')->sortable(),
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
            'index' => Pages\ManagePayrolls::route('/'),
        ];
    }
}
