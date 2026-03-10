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
    Schema::create('images', function (Blueprint $table) {
        $table->id();
        $table->string('title')->nullable(); // Image title/caption
        $table->string('path'); // File path
        $table->string('category')->nullable(); // e.g., "project", "screenshot", "design"
        $table->foreignId('update_id')->nullable()->constrained()->onDelete('cascade'); // Link to portfolio update
        $table->integer('order')->default(0); // Display order
        $table->boolean('is_featured')->default(false); // Featured image
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
