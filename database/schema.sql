CREATE DATABASE vaultX;

USE vaultX;

CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

SELECT
    *
FROM
    users;

CREATE TABLE
    passwords (
        id INT PRIMARY KEY AUTO_INCREMENT,
        app_name VARCHAR(255) NOT NULL,
        category ENUM (
            'Website',
            'Application',
            'Social_Media',
            'Banking',
            'Work',
            'Other'
        ) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        notes TEXT,
        favorite BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

ALTER TABLE passwords
ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL;

DESC passwords;

SELECT
    *
FROM
    passwords;