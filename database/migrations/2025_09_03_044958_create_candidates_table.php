<?php

// database/migrations/2025_09_03_000001_create_candidates_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('position');
            $table->string('phone')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('candidates');
    }
};
