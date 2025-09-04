<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StaffAttendanceResource\Pages;
use App\Models\StaffAttendance;
use App\Models\StaffMember;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;

class StaffAttendanceResource extends Resource
{
    protected static ?string $model = StaffAttendance::class;
    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationLabel = 'Staff Attendance';
    protected static ?string $pluralModelLabel = 'Attendance Records';
    protected static ?string $modelLabel = 'Attendance Record';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('staff_member_id')
                    ->label('Staff Member')
                    ->options(StaffMember::all()->pluck('name', 'id')->toArray())
                    ->searchable()
                    ->required(),
                Forms\Components\DatePicker::make('date')->required(),
                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'P' => 'Present',
                        'A' => 'Absent',
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('staffMember.name') // match relationship method
                    ->label('Staff Member')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('date')->date(),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->formatStateUsing(fn ($state) => $state === 'P' ? 'Present' : 'Absent')
                    ->colors([
                        'success' => fn ($state) => $state === 'P',
                        'danger' => fn ($state) => $state === 'A',
                    ])
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->label('Created At'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options([
                    'P' => 'Present',
                    'A' => 'Absent',
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
            'index' => Pages\ListStaffAttendances::route('/'),
            'create' => Pages\CreateStaffAttendance::route('/create'),
            'edit' => Pages\EditStaffAttendance::route('/{record}/edit'),
        ];
    }
}
