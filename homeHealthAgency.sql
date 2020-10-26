# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.29)
# Database: homeHealthAgency
# Generation Time: 2020-10-26 22:25:37 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ptTable
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ptTable`;

CREATE TABLE `ptTable` (
  `pt_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ptFirstName` char(25) NOT NULL DEFAULT '',
  `ptLastName` char(25) NOT NULL DEFAULT '',
  `streetAddress` char(40) NOT NULL DEFAULT '',
  `city` char(25) NOT NULL DEFAULT '',
  `state` char(2) NOT NULL DEFAULT '',
  `zipcode` int(11) DEFAULT NULL,
  `telephone` bigint(11) NOT NULL,
  `ptHomeLng` float NOT NULL,
  `ptHomeLat` float NOT NULL,
  `nursingNeed` text,
  `visitPriority` tinyint(1) NOT NULL DEFAULT '0',
  `rn_Id` int(2) DEFAULT NULL,
  PRIMARY KEY (`pt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `ptTable` WRITE;
/*!40000 ALTER TABLE `ptTable` DISABLE KEYS */;

INSERT INTO `ptTable` (`pt_id`, `ptFirstName`, `ptLastName`, `streetAddress`, `city`, `state`, `zipcode`, `telephone`, `ptHomeLng`, `ptHomeLat`, `nursingNeed`, `visitPriority`, `rn_Id`)
VALUES
	(1,'Mabel','Horsefeathers','2706 Durham-Chapel Hill Blvd','Durham','NC',27707,9195564477,-78.9318,35.9762,'IV Abx',0,1),
	(2,'Euthamia','Greene','4809 Friends School Rd','Durham','NC',27705,9199873848,-79022900,36.015,'New pt assessment',0,1),
	(3,'Peter','Marshall','1720 Guess Rd','Durham','NC',27701,9192341234,-79.9141,36.0215,'Wound care',0,1),
	(4,'Elizabeth','Jennings','3325 Roxboro St','Durham','NC',27704,9198675462,-78.892,36.0378,'TPN',0,1),
	(5,'Gabriel','Byrne','2020 Chapel Hill Rd','Durham','NC',27707,9196765847,-78.9282,35.9908,'Psych-mental health screening',0,1),
	(6,'Byron','Jones','1920 Cook Rd','Durham','NC',27713,9191239283,-78.9228,35.9358,'Wound care',0,1);

/*!40000 ALTER TABLE `ptTable` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table rnTable
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rnTable`;

CREATE TABLE `rnTable` (
  `rn_Id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rnFirstName` char(25) NOT NULL DEFAULT '',
  `rnLastName` char(25) NOT NULL DEFAULT '',
  `pt_id1` int(11) DEFAULT NULL,
  `pt_id2` int(11) DEFAULT NULL,
  `pt_id3` int(11) DEFAULT NULL,
  `pt_id4` int(11) DEFAULT NULL,
  `pt_id5` int(11) DEFAULT NULL,
  `pt_id6` int(11) DEFAULT NULL,
  `officeLng` float NOT NULL,
  `officeLat` float NOT NULL,
  `rnHomeLng` float DEFAULT NULL,
  `rnHomeLat` float DEFAULT NULL,
  PRIMARY KEY (`rn_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `rnTable` WRITE;
/*!40000 ALTER TABLE `rnTable` DISABLE KEYS */;

INSERT INTO `rnTable` (`rn_Id`, `rnFirstName`, `rnLastName`, `pt_id1`, `pt_id2`, `pt_id3`, `pt_id4`, `pt_id5`, `pt_id6`, `officeLng`, `officeLat`, `rnHomeLng`, `rnHomeLat`)
VALUES
	(1,'Sam','Jones',1,2,3,4,5,6,-78.9014,35.996,-78.9371,35.9285),
	(2,'Elizabeth','Randall',NULL,NULL,NULL,NULL,NULL,NULL,-78.9014,35.996,NULL,NULL),
	(3,'Mark','Roberts',NULL,NULL,NULL,NULL,NULL,NULL,-78.9014,35.996,NULL,NULL),
	(4,'Stephen','Beasley',NULL,NULL,NULL,NULL,NULL,NULL,-78.9014,35.996,NULL,NULL),
	(5,'Wendy','Rhodes',NULL,NULL,NULL,NULL,NULL,NULL,-78.9014,35.996,NULL,NULL),
	(6,'Philip','Jennings',NULL,NULL,NULL,NULL,NULL,NULL,-78.9014,35.996,NULL,NULL);

/*!40000 ALTER TABLE `rnTable` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
