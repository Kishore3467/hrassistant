<?php

namespace App\Filament\Widgets;

use App\Models\Employee;
use Filament\Tables;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentEmployees extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    public function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->query(
                Employee::latest()->limit(5) // Show latest 5
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Employee Name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('role')
                    ->label('Role'),

                Tables\Columns\TextColumn::make('joining_date')
                    ->label('Joining Date')
                    ->date(),
            ]);
    }
}
