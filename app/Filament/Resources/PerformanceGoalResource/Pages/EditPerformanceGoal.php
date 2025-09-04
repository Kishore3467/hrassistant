<?php

namespace App\Filament\Resources\PerformanceGoalResource\Pages;

use App\Filament\Resources\PerformanceGoalResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPerformanceGoal extends EditRecord
{
    protected static string $resource = PerformanceGoalResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
