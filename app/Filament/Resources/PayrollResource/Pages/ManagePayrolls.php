<?php

namespace App\Filament\Resources\PayrollResource\Pages;

use App\Filament\Resources\PayrollResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManagePayrolls extends ManageRecords
{
    protected static string $resource = PayrollResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
