<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Card;
use App\Models\Employee;

class StatsOverview extends BaseWidget
{
    protected function getCards(): array
    {
        return [
            Card::make('Total Employees', Employee::count())
                ->description('All employees in the system')
                ->color('success'),

            Card::make('Hired This Month', Employee::whereMonth('created_at', now()->month)->count())
                ->description('New hires')
                ->color('primary'),
        ];
    }
}
