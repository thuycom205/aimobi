<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppSubmissionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('app_submission', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name');
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('app_name');
            $table->string('splash_screen_img', 2083)->nullable();
            $table->string('icon_url')->nullable();
            $table->json('firebase_information')->nullable();
            $table->enum('app_submission_status', ['pending', 'submitted', 'in review', 'released'])->default('pending');
            $table->string('app_version');
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
        Schema::dropIfExists('app_submission');
    }
}
