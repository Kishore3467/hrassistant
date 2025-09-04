<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DocumentResource\Pages;
use App\Models\Document;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DocumentResource extends Resource
{
    protected static ?string $model = Document::class;
    protected static ?int $navigationSort = 2;
    protected static ?string $navigationGroup = 'DOCUMENTS';
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Documents';
    protected static ?string $pluralLabel = 'Documents';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('type')
                    ->label('Document Type')
                    ->options([
                        'Offer Letter' => 'Offer Letter',
                        'NDA' => 'NDA',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('recipient_name')
                    ->label('Recipient Name')
                    ->required(),

                Forms\Components\TextInput::make('position')
                    ->label('Position'),

                Forms\Components\TextInput::make('company_name')
                    ->label('Company Name'),

                Forms\Components\Textarea::make('content')
                    ->label('Generated Content')
                    ->rows(15)
                    ->disabled()
                    ->dehydrated(false), // Prevent overwriting on form submit
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('type'),
                Tables\Columns\TextColumn::make('recipient_name'),
                Tables\Columns\TextColumn::make('position'),
                Tables\Columns\TextColumn::make('company_name'),
                Tables\Columns\TextColumn::make('created_at')->dateTime(),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDocuments::route('/'),
            'create' => Pages\CreateDocument::route('/create'),
            'edit' => Pages\EditDocument::route('/{record}/edit'),
        ];
    }
}
