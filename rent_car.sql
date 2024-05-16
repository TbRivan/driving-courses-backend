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

 Date: 16/05/2024 11:30:23
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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (1, 'coba', 1, 'test@gmail.com', 'cobaa', 1, '2024-05-15 13:22:59', '2024-05-15 13:22:59');
INSERT INTO `account` VALUES (6, 'test', 2, 'cobsa@gmail.com', '$2b$10$V00FojIFCYq6lo0rxZ6CuO2w6l/4wmWAkCIB.vthbpnBzYqVK87.a', 1, '2024-05-15 15:13:39', '2024-05-15 15:13:39');

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
	IN `_name` VARCHAR(50),
	IN `_email` VARCHAR(50))
BEGIN
	
	UPDATE 
		account 
	SET 
		name = _name,
		email = _email
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

SET FOREIGN_KEY_CHECKS = 1;
