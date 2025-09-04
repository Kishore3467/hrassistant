<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeaveRequestResource\Pages;
use App\Models\LeaveRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables;

class LeaveRequestResource extends Resource
{
    protected static ?string $model = LeaveRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationLabel = 'Leave Requests';
    protected static ?string $pluralLabel = 'Leave Requests';
    protected static ?string $modelLabel = 'Leave Request';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')->required()->label('Full Name'),
                Forms\Components\TextInput::make('email')->email()->required()->label('Email'),
                Forms\Components\DatePicker::make('date')->required()->label('Start Date'),
                Forms\Components\DatePicker::make('end_date')->required()->label('End Date'),
                Forms\Components\TextInput::make('subject')->required()->label('Subject'),
                Forms\Components\Textarea::make('reason')->required()->label('Reason'),
                Forms\Components\Select::make('leave_type')
                    ->options([
                        'Personal' => 'Personal',
                        'Medical' => 'Medical',
                        'Vacation' => 'Vacation',
                        'Bereavement' => 'Bereavement',
                        'Other' => 'Other',
                    ])
                    ->required()
                    ->label('Leave Type'),
                Forms\Components\Select::make('status')
                    ->options([
                        'Pending' => 'Pending',
                        'Approved' => 'Approved',
                        'Rejected' => 'Rejected',
                    ])
                    ->default('Pending')
                    ->required()
                    ->label('Status'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('leave_type'),
                Tables\Columns\TextColumn::make('status')->sortable(),
                Tables\Columns\TextColumn::make('date')->date(),
                Tables\Columns\TextColumn::make('end_date')->date(),
                Tables\Columns\TextColumn::make('subject')->limit(20),
                Tables\Columns\TextColumn::make('reason')->limit(30),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options([
                    'Pending' => 'Pending',
                    'Approved' => 'Approved',
                    'Rejected' => 'Rejected',
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
            'index' => Pages\ListLeaveRequests::route('/'),
            'create' => Pages\CreateLeaveRequest::route('/create'),
            'edit' => Pages\EditLeaveRequest::route('/{record}/edit'),
        ];
    }
}
