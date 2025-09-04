<?php

namespace App\Filament\Resources\PolicyDocumentResource\Pages;

use App\Filament\Resources\PolicyDocumentResource;
use Filament\Resources\Pages\CreateRecord;
use Smalot\PdfParser\Parser;

class CreatePolicyDocument extends CreateRecord
{
    // ✅ Required to fix the error
    protected static string $resource = PolicyDocumentResource::class;

    protected function afterCreate(): void
    {
        $document = $this->record;

        $path = storage_path('app/public/' . $document->file_path);

        if (file_exists($path)) {
            $parser = new Parser();
            $text = $parser->parseFile($path)->getText();
            $document->parsed_text = substr($text, 0, 10000); // limit for safety
            $document->save();
        }
    }
}
