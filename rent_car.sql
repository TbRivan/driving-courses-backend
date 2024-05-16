/*
 Navicat Premium Data Transfer

 Source Server         : DB-Mysql
 Source Server Type    : MySQL
 Source Server Version : 80037 (8.0.37)
 Source Host           : localhost:3306
 Source Schema         : rent_car

 Target Server Type    : MySQL
 Target Server Version : 80037 (8.0.37)
 File Encoding         : 65001

 Date: 16/05/2024 16:31:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` int NULL DEFAULT 1 COMMENT '1 = Admin, 2 = User',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NULL DEFAULT 1 COMMENT '1 = Active, 0 = Non Active',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (7, 'admin', 1, 'admin@gmail.com', '$2b$10$MKlmJjaJDC6ujTRN3OCL8up5NwhyWcukD6QXRIDhxedljdmNyWu5C', 1, '2024-05-16 15:45:46', '2024-05-16 15:45:46');
INSERT INTO `account` VALUES (8, 'user', 2, 'user@gmail.com', '$2b$10$RPGXu6qGZyt1tcaoFix/oe26YVB2pH6YuX6rS.61.u2OebaldxGtK', 0, '2024-05-16 15:46:13', '2024-05-16 15:46:13');

-- ----------------------------
-- Procedure structure for change_password
-- ----------------------------
DROP PROCEDURE IF EXISTS `change_password`;
delimiter ;;
CREATE PROCEDURE `change_password`(IN `_userid` INT,
	IN `_password` VARCHAR(255))
BEGIN
	
	UPDATE 
		account 
	SET 
		password = _password
	WHERE 
		id = _userid;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for change_status_account
-- ----------------------------
DROP PROCEDURE IF EXISTS `change_status_account`;
delimiter ;;
CREATE PROCEDURE `change_status_account`(IN `_userid` INT,
	IN `_status` INT)
BEGIN
	
	UPDATE
		account 
	SET 
		status = _status
	WHERE 
		id = _userid;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for create_account
-- ----------------------------
DROP PROCEDURE IF EXISTS `create_account`;
delimiter ;;
CREATE PROCEDURE `create_account`(IN `_name` VARCHAR(50),
	IN `_role` INT,
	IN `_email` VARCHAR(50),
	IN `_password` VARCHAR(255))
BEGIN
	
	INSERT INTO account (name, role, email, password) VALUES (_name, _role, _email, _password);

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for edit_account
-- ----------------------------
DROP PROCEDURE IF EXISTS `edit_account`;
delimiter ;;
CREATE PROCEDURE `edit_account`(IN `_userid` INT,
	IN `_name` VARCHAR(50))
BEGIN
	
	UPDATE 
		account 
	SET 
		name = _name
	WHERE 
		id = _userid;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for find_account
-- ----------------------------
DROP PROCEDURE IF EXISTS `find_account`;
delimiter ;;
CREATE PROCEDURE `find_account`(IN `_email` VARCHAR(50))
BEGIN
	
	SELECT 
		id,
		name,
		email,
		role,
		status,
		password
	FROM 
		account
	WHERE 
		email = _email;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for find_account_by_id
-- ----------------------------
DROP PROCEDURE IF EXISTS `find_account_by_id`;
delimiter ;;
CREATE PROCEDURE `find_account_by_id`(IN `_id` INT)
BEGIN
	
	SELECT 
		id,
		name,
		email,
		role,
		status,
		password
	FROM 
		account
	WHERE 
		id = _id;

END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
