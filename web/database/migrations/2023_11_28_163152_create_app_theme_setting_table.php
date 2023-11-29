<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppThemeSettingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('app_theme_setting', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name');
            $table->string('theme_name');
            $table->string('color_scheme')->nullable();
            $table->json('color_scheme_json')->nullable();
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
        Schema::dropIfExists('app_theme_setting');
    }
}
