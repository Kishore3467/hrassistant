<?php

namespace App\Filament\Resources\PolicyDocumentResource\Pages;

use App\Filament\Resources\PolicyDocumentResource;
use Filament\Resources\Pages\EditRecord;
use Smalot\PdfParser\Parser;

class EditPolicyDocument extends EditRecord
{
    // ✅ Required to fix "must not be accessed before initialization"
    protected static string $resource = PolicyDocumentResource::class;

    protected function afterSave(): void
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
