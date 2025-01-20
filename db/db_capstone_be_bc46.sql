CREATE DATABASE IF NOT EXISTS db_capstone_be_bc46
use db_capstone_be_bc46

CREATE TABLE IF NOT EXISTS users (
	`user_id` INT PRIMARY KEY AUTO_INCREMENT,
	`email` varchar(255) NOT NULL,
	`pass_word` varchar(255) DEFAULT NULL,
	`age` INT, --tính tuổi
	`full_name` varchar(255) NOT NULL,
	`avatar` varchar(255) DEFAULT NULL,
	`google_id` varchar(255) DEFAULT NULL,
	`face_app_id` varchar(255) DEFAULT NULL
)

CREATE TABLE images (
	image_id INT PRIMARY KEY AUTO_INCREMENT,
	image_name VARCHAR(255),
	image_url VARCHAR(500),
	description VARCHAR(255),
	author_id INT,
	FOREIGN KEY (author_id) REFERENCES users (user_id)
)

CREATE TABLE save_image (
	user_id INT,
	image_id INT,
	date_save DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id,image_id),
	FOREIGN KEY (user_id) REFERENCES users (user_id),
	FOREIGN KEY (image_id) REFERENCES images (image_id)
)

CREATE TABLE comments (
	comment_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT,
	image_id INT,
	date_comment DATETIME DEFAULT CURRENT_TIMESTAMP,
	content VARCHAR(255),
	FOREIGN KEY (user_id) REFERENCES users (user_id),
	FOREIGN KEY (image_id) REFERENCES images (image_id)
)

-- Thêm dữ liệu vào bảng users
INSERT INTO users (email, pass_word, age, full_name, avatar, google_id, face_app_id) 
VALUES 
('user1@example.com', 'password123', 25, 'John Doe', 'avatar1.jpg', NULL, NULL),
('user2@example.com', 'password456', 30, 'Jane Smith', 'avatar2.jpg', 'google123', 'facebook123');

-- Thêm dữ liệu vào bảng images
INSERT INTO images (image_name, image_url, description, author_id) 
VALUES 
('Sunset', 'https://example.com/sunset.jpg', 'A beautiful sunset', 1),
('Mountain', 'https://example.com/mountain.jpg', 'Snowy mountain view', 2);

-- Thêm dữ liệu vào bảng save_image
INSERT INTO save_image (user_id, image_id) 
VALUES 
(1, 1), 
(2, 2); 

-- Thêm dữ liệu vào bảng comments
INSERT INTO comments (user_id, image_id, title) 
VALUES 
(1, 1, 'Amazing photo!'), 
(2, 2, 'Stunning view!'); 




