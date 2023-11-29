<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
// Migration for the 'menu_items' table
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name');
            $table->string('title');
            $table->string('type');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('color')->nullable();
            $table->string('icon')->nullable();
            $table->unsignedBigInteger('menu_id');
            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('cascade');
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
        Schema::dropIfExists('menu_items');
    }
}
