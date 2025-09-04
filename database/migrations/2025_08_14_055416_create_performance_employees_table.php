<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('performance_employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique();
            $table->string('name');
            $table->string('role');
            $table->string('department');
            $table->decimal('rating', 3, 2)->nullable();
            $table->date('last_review')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('performance_employees');
    }
};
