<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name');
            $table->string('type');
            $table->string('title');
            $table->text('content');
            $table->enum('send_time_type', ['immediate', 'scheduled']);
            $table->dateTime('scheduled_send_time')->nullable();
            $table->json('rich_media')->nullable();
            $table->string('img_url', 2083)->nullable();
            $table->enum('status', ['pending', 'processed', 'sent', 'archived', 'scheduled'])->default('pending');
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
        Schema::dropIfExists('notifications');
    }
}
