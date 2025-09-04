<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('chat_logs', function (Blueprint $table) {
            $table->id();
            $table->string('user_message');
            $table->string('bot_reply');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_logs');
    }
};
