<?php

namespace App\Filament\Widgets;

use App\Models\OnboardingChecklist;
use Filament\Tables;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;

class TodayOnboarding extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    protected function getTableQuery(): Builder|Relation|null
    {
        return OnboardingChecklist::query()
            ->whereDate('start_date', today());
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('employee_name')
                ->label('Employee'),
            Tables\Columns\TextColumn::make('start_date')
                ->label('Joining Date')
                ->date(),
            Tables\Columns\TextColumn::make('tasks')
                ->label('Tasks Completed')
                ->formatStateUsing(fn ($state) => is_array($state) ? count($state) . ' done' : '0 done'),
        ];
    }
}
