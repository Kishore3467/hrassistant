<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use App\Filament\Widgets\StatsOverview;
use App\Filament\Widgets\RecentEmployees;

class Dashboard extends Page
{
    protected static string $view = 'filament.pages.dashboard';
    protected static ?int $navigationSort = 1;  // Make sure this is set
    protected static ?string $navigationGroup = 'Main Menu'; // Optional grouping

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Dashboard';
    protected static ?string $title = 'HR CoPilot Dashboard';

    protected function getHeaderWidgets(): array
    {
        return [
            StatsOverview::class,
            RecentEmployees::class,
        ];
    }
    
}
