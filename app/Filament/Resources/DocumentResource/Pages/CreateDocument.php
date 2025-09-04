<?php

namespace App\Filament\Resources\DocumentResource\Pages;

use App\Filament\Resources\DocumentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateDocument extends CreateRecord
{
    protected static string $resource = DocumentResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if ($data['type'] === 'Offer Letter') {
            $data['content'] = "Dear {$data['recipient_name']},\n\nWe are pleased to offer you the position of {$data['position']} at {$data['company_name']}.\n\nWe look forward to working with you.\n\nSincerely,\n{$data['company_name']} HR Team";
        } elseif ($data['type'] === 'NDA') {
            $data['content'] = "CONFIDENTIALITY AGREEMENT\n\nThis NDA is entered into between {$data['company_name']} and {$data['recipient_name']}.\n\nThe recipient agrees to maintain confidentiality regarding company information.\n\nSigned,\n{$data['company_name']} HR Department";
        }

        return $data;
    }
}
