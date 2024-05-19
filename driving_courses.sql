/*
 Navicat Premium Data Transfer

 Source Server         : Mysql Local
 Source Server Type    : MySQL
 Source Server Version : 80036 (8.0.36)
 Source Host           : localhost:3306
 Source Schema         : driving_courses

 Target Server Type    : MySQL
 Target Server Version : 80036 (8.0.36)
 File Encoding         : 65001

 Date: 19/05/2024 21:40:43
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
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (7, 'admin', 1, 'admin@gmail.com', '$2b$10$MKlmJjaJDC6ujTRN3OCL8up5NwhyWcukD6QXRIDhxedljdmNyWu5C', 1, '2024-05-16 15:45:46', '2024-05-16 15:45:46');
INSERT INTO `account` VALUES (8, 'user', 2, 'user@gmail.com', '$2b$10$RPGXu6qGZyt1tcaoFix/oe26YVB2pH6YuX6rS.61.u2OebaldxGtK', 1, '2024-05-16 15:46:13', '2024-05-16 15:46:13');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NULL DEFAULT NULL,
  `package_id` int NULL DEFAULT NULL,
  `remaining_meet` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_User`(`account_id` ASC) USING BTREE,
  INDEX `FK_package`(`package_id` ASC) USING BTREE,
  CONSTRAINT `FK_package` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_User` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, 8, 1, 3, 1, '2024-05-19 20:37:49', '2024-05-19 21:03:16');
INSERT INTO `order` VALUES (2, 8, 2, 10, 1, '2024-05-19 21:23:54', '2024-05-19 21:28:04');

-- ----------------------------
-- Table structure for package
-- ----------------------------
DROP TABLE IF EXISTS `package`;
CREATE TABLE `package`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_package` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `time_package` int NULL DEFAULT NULL,
  `type_car` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` int NULL DEFAULT NULL,
  `createdBy` int NULL DEFAULT NULL,
  `updatedBy` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_created`(`createdBy` ASC) USING BTREE,
  INDEX `FK_updated`(`updatedBy` ASC) USING BTREE,
  CONSTRAINT `FK_created` FOREIGN KEY (`createdBy`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_updated` FOREIGN KEY (`updatedBy`) REFERENCES `account` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of package
-- ----------------------------
INSERT INTO `package` VALUES (1, 'test', 'this is for test', 10, 'manual', 1000000, 7, 7, 0, '2024-05-16 16:45:37', '2024-05-18 17:38:53');
INSERT INTO `package` VALUES (2, 'test', 'this is for test', 10, 'manual', 1000000, 7, NULL, 1, '2024-05-18 16:46:49', '2024-05-18 16:46:49');

-- ----------------------------
-- Procedure structure for accept_training_admin
-- ----------------------------
DROP PROCEDURE IF EXISTS `accept_training_admin`;
delimiter ;;
CREATE PROCEDURE `accept_training_admin`(IN `_order_id` INT)
BEGIN

	DECLARE _remaining_meet INT;
	
	SELECT remaining_meet INTO _remaining_meet
	FROM `order`
	WHERE id = _order_id;
	
	IF _remaining_meet <= 0 THEN
	
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sudah tidak ada pelatihan tersisa';
		
	ELSE
	
		UPDATE 
			`order` 
		SET 
			remaining_meet = remaining_meet - 1 
		WHERE 
			id = _order_id;
			
	END IF;

END
;;
delimiter ;

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
-- Procedure structure for create_order
-- ----------------------------
DROP PROCEDURE IF EXISTS `create_order`;
delimiter ;;
CREATE PROCEDURE `create_order`(IN `_account_id` INT,
	IN `_package_id` INT)
BEGIN

	DECLARE _remaining_meet INT;
	
	SELECT time_package INTO _remaining_meet
	FROM package
	WHERE id = _package_id;
	
	INSERT INTO 
		`order` (account_id, package_id, remaining_meet) 
	VALUES (_account_id, _package_id, _remaining_meet);

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for create_package
-- ----------------------------
DROP PROCEDURE IF EXISTS `create_package`;
delimiter ;;
CREATE PROCEDURE `create_package`(IN `_name_package` VARCHAR(255),
	IN `_description` TEXT,
	IN `_time_package` INT,
	IN `_type_car` VARCHAR(50),
	IN `_price` INT,
	IN `_createdBy` INT)
BEGIN
	
	INSERT INTO 
		package 
		(name_package, description, time_package, type_car, price, createdBy) 
	VALUES 
		(_name_package, _description, _time_package, _type_car, _price, _createdBy);

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for disable_order
-- ----------------------------
DROP PROCEDURE IF EXISTS `disable_order`;
delimiter ;;
CREATE PROCEDURE `disable_order`(IN `_order_id` INT)
BEGIN
	
	UPDATE 
		`order` 
	SET 
		status = 0
	WHERE 
		id = _order_id;
			
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for disable_package
-- ----------------------------
DROP PROCEDURE IF EXISTS `disable_package`;
delimiter ;;
CREATE PROCEDURE `disable_package`(IN `_id_package` INT)
BEGIN
	
	UPDATE 
		package 
	SET 
		status = 0
	WHERE 
		id = _id_package;

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
-- Procedure structure for edit_package
-- ----------------------------
DROP PROCEDURE IF EXISTS `edit_package`;
delimiter ;;
CREATE PROCEDURE `edit_package`(IN `_id_package` INT,
	IN `_name_package` VARCHAR(255),
	IN `_description` TEXT,
	IN `_time_package` INT,
	IN `_type_car` VARCHAR(50),
	IN `_price` INT,
	IN `_updatedBy` INT)
BEGIN
	
	UPDATE 
		package 
	SET 
		name_package = _name_package,
		description = _description,
		time_package = _time_package,
		type_car = _type_car,
		price = _price,
		updatedBy = _updatedBy
	WHERE 
		id = _id_package;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for edit_remaining_meet_admin
-- ----------------------------
DROP PROCEDURE IF EXISTS `edit_remaining_meet_admin`;
delimiter ;;
CREATE PROCEDURE `edit_remaining_meet_admin`(IN `_order_id` INT,
	IN `_remaining_meet` INT)
BEGIN

	UPDATE 
		`order` 
	SET 
		remaining_meet = _remaining_meet
	WHERE 
		id = _order_id;

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
