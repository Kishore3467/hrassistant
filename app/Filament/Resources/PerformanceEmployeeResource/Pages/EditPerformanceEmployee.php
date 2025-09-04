<?php

namespace App\Filament\Resources\PerformanceEmployeeResource\Pages;

use App\Filament\Resources\PerformanceEmployeeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPerformanceEmployee extends EditRecord
{
    protected static string $resource = PerformanceEmployeeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
