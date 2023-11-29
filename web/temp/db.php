<?php
// Migration for the 'screens' table
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

// Migration for the 'menus' table
Schema::create('menus', function (Blueprint $table) {
    $table->id();
    $table->string('shop_name');
    $table->string('title')->default('Untitled');
    $table->enum('menu_type', ['drawer', 'tab_bar'])->default('drawer');
    $table->json('menu_items');
    $table->timestamps();
});

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

// Migration for the 'notifications' table
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

// Migration for the 'app_submission' table
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

// Migration for the 'app_theme_setting' table
Schema::create('app_theme_setting', function (Blueprint $table) {
    $table->id();
    $table->string('shop_name');
    $table->string('theme_name');
    $table->string('color_scheme')->nullable();
    $table->json('color_scheme_json')->nullable();
    $table->timestamps();
});
