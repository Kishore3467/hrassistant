<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserDocumentResource\Pages;
use App\Models\UserDocument;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

use Filament\Tables;

class UserDocumentResource extends Resource
{
    protected static ?string $model = UserDocument::class;
    protected static ?int $navigationSort = 2;
    protected static ?string $navigationGroup = 'EMPLOYEE DOCUMENTS';

    protected static ?string $navigationIcon = 'heroicon-o-document';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('type')
                    ->label('Document Type')
                    ->required()
                    ->options([
                        'education' => 'Educational Documents',
                        'aadhar' => 'Aadhar Card',
                        'pan' => 'PAN Card',
                        'bank_passbook' => 'Bank Passbook',
                        'passport_photo' => 'Passport Size Photo',
                        'experience_certificate' => 'Experience Certificate',
                    ]),
                Forms\Components\FileUpload::make('file_path')
                    ->label('Upload Document')
                    ->directory('user_documents')
                    ->required(),
            ]);
    }

    public static function table(Tables\Table $table): Tables\Table
{
    return $table->columns([
        TextColumn::make('id')->sortable(),
        TextColumn::make('type')->sortable()->searchable(),

        TextColumn::make('file_path')
            ->label('Document')
            ->formatStateUsing(fn ($state) => "<a href='" . asset('storage/' . $state) . "' target='_blank' rel='noopener noreferrer'>View Document</a>")
            ->html(),

        TextColumn::make('created_at')->dateTime()->sortable(),
    ]);
}

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUserDocuments::route('/'),
            'create' => Pages\CreateUserDocument::route('/create'),
            'edit' => Pages\EditUserDocument::route('/{record}/edit'),
        ];
    }
}
