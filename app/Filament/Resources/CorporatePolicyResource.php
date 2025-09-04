<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CorporatePolicyResource\Pages;
use App\Models\CorporatePolicy;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables;

class CorporatePolicyResource extends Resource
{
    protected static ?string $model = CorporatePolicy::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Corporate Policies';
    protected static ?string $navigationGroup = 'HR';

    // Add this to ensure Filament registers the correct route
    public static function getSlug(): string
    {
        return 'corporate-policies';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
               Forms\Components\Select::make('name')
    ->label('Policy Name')
    ->required()
    ->options([
        'Employee Handbook' => 'Employee Handbook',
        'Code of Conduct' => 'Code of Conduct',
        'Data Privacy Policy' => 'Data Privacy Policy',
        'Remote Work Policy' => 'Remote Work Policy',
        'Leave Policy' => 'Leave Policy',
        'Accessibility Policy' => 'Accessibility Policy',
    ])
    ->searchable(), // optional, lets you type to search

                Forms\Components\TextInput::make('category')
                    ->required()
                    ->label('Category'),
                Forms\Components\FileUpload::make('file_path')
                    ->directory('corporate-policies')
                    ->required()
                    ->label('PDF File'),
                Forms\Components\DatePicker::make('updated')
                    ->label('Last Updated'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->sortable()->searchable()->label('Policy Name'),
                Tables\Columns\TextColumn::make('category')->label('Category'),
                Tables\Columns\TextColumn::make('updated')->date()->label('Last Updated'),
                Tables\Columns\TextColumn::make('file_path')->label('PDF File'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->filters([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCorporatePolicies::route('/'),
            'create' => Pages\CreateCorporatePolicy::route('/create'),
            'edit' => Pages\EditCorporatePolicy::route('/{record}/edit'),
        ];
    }
}
