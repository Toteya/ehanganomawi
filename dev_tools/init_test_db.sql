-- Prepares MYSQL server for the project

-- Sets the password policy level to LOW
SET GLOBAL validate_password.policy=LOW;

-- Delete old database, user and create new one

DROP DATABASE IF EXISTS omawi_test_db;
CREATE DATABASE IF NOT EXISTS omawi_test_db;
CREATE USER IF NOT EXISTS 'omawi_test'@'localhost' IDENTIFIED BY 'omawi_test_pwd';
GRANT ALL PRIVILEGES ON `omawi_test_db`.* TO 'omawi_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'omawi_test'@'localhost';
FLUSH PRIVILEGES;
