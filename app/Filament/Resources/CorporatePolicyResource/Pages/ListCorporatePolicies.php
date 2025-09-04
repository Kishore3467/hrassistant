<?php

namespace App\Filament\Resources\CorporatePolicyResource\Pages;

use App\Filament\Resources\CorporatePolicyResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCorporatePolicies extends ListRecords
{
    protected static string $resource = CorporatePolicyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
