<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OnboardingChecklistResource\Pages;
use App\Models\OnboardingChecklist;
use Filament\Forms;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Tables;

class OnboardingChecklistResource extends Resource
{
    protected static ?string $model = OnboardingChecklist::class;
    protected static ?int $navigationSort = 2;
    protected static ?string $navigationGroup = 'ONBOARDING CHECKLIST';
protected static ?string $navigationIcon = 'heroicon-m-clipboard-document-check';
    protected static ?string $navigationLabel = 'Onboarding Checklists';
    protected static ?string $pluralLabel = 'Onboarding Checklists';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('employee_name')->label('Employee Name')->required(),
            DatePicker::make('start_date')->label('Joining Date')->required(),
            CheckboxList::make('tasks')
                ->label('Checklist Tasks')
                ->options([
                    'profile' => 'Create employee profile in HR system',
                    'docs' => 'Upload signed offer letter & documents',
                    'email' => 'Assign employee ID and email address',
                    'system_access' => 'Set up system access',
                    'welcome_kit' => 'Prepare welcome kit',
                    'buddy' => 'Assign buddy/mentor',
                    'notify_team' => 'Notify team about new joiner',
                    'welcome_session' => 'Welcome & introduction session',
                    'office_tour' => 'Office tour / virtual tour',
                    'policies' => 'Explain company policies & handbook',
                    'forms' => 'Fill bank details & tax forms',
                    'credentials' => 'Provide login credentials',
                    'week_schedule' => 'Assign first-week schedule',
                    'payroll' => 'Add to payroll system',
                    'benefits' => 'Enroll in benefits & insurance',
                    'feedback' => 'Schedule onboarding feedback session',
                    'project' => 'Assign first project/tasks',
                    'reviews' => 'Schedule 30-60-90 day review',
                ])
                ->columns(1)
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('employee_name')->label('Employee')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('start_date')->label('Joining Date')->date()->sortable(),
                Tables\Columns\BadgeColumn::make('tasks')
                    ->label('Tasks Completed')
                    ->formatStateUsing(fn ($state) => is_array($state) ? count($state) . ' tasks' : '0 tasks'),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOnboardingChecklists::route('/'),
            'create' => Pages\CreateOnboardingChecklist::route('/create'),
            'edit' => Pages\EditOnboardingChecklist::route('/{record}/edit'),
        ];
    }
}

