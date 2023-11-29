CREATE TABLE screens (
id INT AUTO_INCREMENT PRIMARY KEY,
shop_name VARCHAR(255),
title VARCHAR(255) DEFAULT 'Home',
page_type ENUM('home', 'landing_page') NOT NULL DEFAULT 'home',
page_content JSON,
status ENUM('draft', 'active', 'sent', 'archived', 'scheduled') NOT NULL DEFAULT 'active',
page_title VARCHAR(255)
);

CREATE TABLE menus (
id INT AUTO_INCREMENT PRIMARY KEY,
shop_name VARCHAR(255),
title VARCHAR(255) DEFAULT 'Untitled',
menu_type ENUM('drawer', 'tab_bar') NOT NULL DEFAULT 'drawer',
menu_items JSON
);

CREATE TABLE menu_items (
id INT AUTO_INCREMENT PRIMARY KEY,
shop_name VARCHAR(255),
title VARCHAR(255),
type VARCHAR(255),
parent_id INT,
color VARCHAR(255),
icon VARCHAR(255),
menu_id INT,
FOREIGN KEY (menu_id) REFERENCES menus(id)
);
CREATE TABLE notifications (
id INT AUTO_INCREMENT PRIMARY KEY,
shop_name VARCHAR(255),
type VARCHAR(255),
title VARCHAR(255),
content TEXT,
send_time_type ENUM('immediate', 'scheduled') NOT NULL,
scheduled_send_time DATETIME DEFAULT NULL,
rich_media JSON,
img_url VARCHAR(2083),
status ENUM('pending', 'processed', 'sent', 'archived', 'scheduled') NOT NULL DEFAULT 'pending'
);
CREATE TABLE app_submission (
id INT AUTO_INCREMENT PRIMARY KEY,
shop_name VARCHAR(255) NOT NULL,
phone VARCHAR(20),
email VARCHAR(255),
app_name VARCHAR(255) NOT NULL,
splash_screen_img VARCHAR(2083),
icon_url  VARCHAR(255) NULL,
firebase_information JSON,
app_submission_status ENUM('pending', 'submitted', 'in review', 'released') NOT NULL DEFAULT 'pending',
app_version VARCHAR(20) NOT NULL
);

CREATE TABLE app_theme_setting (
id INT AUTO_INCREMENT PRIMARY KEY,
shop_name VARCHAR(255) NOT NULL,
theme_name VARCHAR(255) NOT NULL,
color_scheme VARCHAR(255) NULL,
color_scheme_json JSON NULL
);
