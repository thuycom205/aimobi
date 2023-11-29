<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScreensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('screens', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name');
            $table->string('title')->default('Home');
            $table->enum('page_type', ['home', 'landing_page'])->default('home');
            $table->json('page_content');
            $table->enum('status', ['draft', 'active', 'sent', 'archived', 'scheduled'])->default('active');
            $table->string('page_title');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('screens');
    }
}
