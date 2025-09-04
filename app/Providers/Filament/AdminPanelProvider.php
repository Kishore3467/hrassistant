<?php

namespace App\Providers\Filament;

use Filament\PanelProvider;
use Filament\Panel;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->registration()
            ->profile()
            ->discoverResources(
                app_path('Filament/Resources'), // folder
                'App\\Filament\\Resources'      // namespace
            )
            ->discoverPages(
                app_path('Filament/Pages'),
                'App\\Filament\\Pages'
            )
            ->discoverWidgets(
                app_path('Filament/Widgets'),
                'App\\Filament\\Widgets'
            );
    }
}
