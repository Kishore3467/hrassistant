<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('performance_goals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('progress')->default(0);
            $table->date('deadline');
            $table->timestamps();
        });

        // Pivot table for goal assignments
        Schema::create('goal_employee', function (Blueprint $table) {
            $table->id();
            $table->foreignId('performance_goal_id')->constrained()->cascadeOnDelete();
            $table->foreignId('performance_employee_id')->constrained()->cascadeOnDelete();
        });
    }

    public function down(): void {
        Schema::dropIfExists('goal_employee');
        Schema::dropIfExists('performance_goals');
    }
};
