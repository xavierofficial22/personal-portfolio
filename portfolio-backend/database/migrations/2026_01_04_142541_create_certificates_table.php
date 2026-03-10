<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
        {
            Schema::create('certificates', function (Blueprint $table) {
                $table->id();
                $table->string('name'); // e.g., "TOPCIT Level 3"
                $table->string('full_name'); // Full certificate name
                $table->string('issuer'); // e.g., "Simplilearn"
                $table->string('image'); // Path to certificate image
                $table->date('issue_date'); // When you got it
                $table->string('certificate_no')->nullable(); // Certificate number
                $table->string('score')->nullable(); // If applicable (e.g., "404/1000")
                $table->text('skills')->nullable(); // Skills covered (JSON or comma-separated)
                $table->text('description')->nullable(); // Additional details
                $table->boolean('is_visible')->default(true); // Show/hide
                $table->timestamps();
            });
        }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
