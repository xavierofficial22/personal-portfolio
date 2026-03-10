<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Drop old column and add new JSON column
        Schema::table('updates', function (Blueprint $table) {
            $table->dropColumn('image');
        });
        Schema::table('updates', function (Blueprint $table) {
            $table->json('images')->nullable()->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('updates', function (Blueprint $table) {
            $table->dropColumn('images');
        });
        Schema::table('updates', function (Blueprint $table) {
            $table->string('image')->nullable()->after('description');
        });
    }
};
