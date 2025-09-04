<?php

namespace App\Filament\Resources\PerformanceEmployeeResource\Pages;

use App\Filament\Resources\PerformanceEmployeeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPerformanceEmployees extends ListRecords
{
    protected static string $resource = PerformanceEmployeeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
