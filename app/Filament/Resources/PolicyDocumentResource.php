<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PolicyDocumentResource\Pages;
use App\Models\PolicyDocument;
use Filament\Forms\Form; // ✅ CORRECT
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn; // ✅ This fixes your error
use Filament\Forms\Components\FileUpload;
use Filament\Resources\Resource;
use Smalot\PdfParser\Parser;

class PolicyDocumentResource extends Resource
{
    protected static ?string $model = PolicyDocument::class;
    protected static ?int $navigationSort = 2;
    protected static ?string $navigationGroup = 'COMPANY POLICY';

   public static function form(Form $form): Form
{
    return $form
        ->schema([
            FileUpload::make('file_path')
                ->directory('documents') // stores under storage/app/public/documents
                ->preserveFilenames()
                ->required(),
        ]);
}

    public static function table(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('title')->label('Title'),
            TextColumn::make('parsed_text')->limit(50)->label('Preview'),
        ]);
}

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPolicyDocuments::route('/'),
            'create' => Pages\CreatePolicyDocument::route('/create'),
            'edit' => Pages\EditPolicyDocument::route('/{record}/edit'),
        ];
    }
}
