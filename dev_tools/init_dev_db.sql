-- Prepares MYSQL server for the project

-- Sets the password policy level to LOW
SET GLOBAL validate_password.policy=LOW;

-- Delete old database, user and create new one
DROP DATABASE IF EXISTS omawi_dev_db;
CREATE DATABASE IF NOT EXISTS omawi_dev_db;
CREATE USER IF NOT EXISTS 'omawi_dev'@'localhost' IDENTIFIED BY 'omawi_dev_pwd';
GRANT ALL PRIVILEGES ON `omawi_dev_db`.* TO 'omawi_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'omawi_dev'@'localhost';
FLUSH PRIVILEGES;
