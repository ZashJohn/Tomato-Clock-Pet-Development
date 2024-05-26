create database sss;
use sss;

CREATE TABLE IF NOT EXISTS sss.user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pasword VARCHAR(255) NOT NULL
);
desc user;
