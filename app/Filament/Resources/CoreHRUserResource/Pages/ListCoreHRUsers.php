<?php

namespace App\Filament\Resources\CoreHRUserResource\Pages;

use App\Filament\Resources\CoreHRUserResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCoreHRUsers extends ListRecords
{
    protected static string $resource = CoreHRUserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
