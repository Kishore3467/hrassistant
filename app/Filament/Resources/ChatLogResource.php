<?php
namespace App\Filament\Resources;

use App\Filament\Resources\ChatLogResource\Pages;
use App\Models\ChatLog;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ChatLogResource extends Resource
{
    protected static ?string $model = ChatLog::class;
     protected static ?int $navigationSort = 2;
    protected static ?string $navigationGroup = 'CHAT LOGS QUERIES';
    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationLabel = 'Chat Logs';
    protected static ?string $pluralLabel = 'Chat Logs';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('user_message')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('bot_reply')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user_message')->searchable(),
                Tables\Columns\TextColumn::make('bot_reply')->searchable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime(),
            ])
            ->filters([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListChatLogs::route('/'),
            'create' => Pages\CreateChatLog::route('/create'),
            'edit' => Pages\EditChatLog::route('/{record}/edit'),
        ];
    }
}
