<?php

namespace App\Filament\Resources\CoreHRUserResource\Pages;

use App\Filament\Resources\CoreHRUserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCoreHRUser extends EditRecord
{
    protected static string $resource = CoreHRUserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
