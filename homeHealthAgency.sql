# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.29)
# Database: homeHealthAgency
# Generation Time: 2020-11-01 20:38:24 +0000
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
  `pt_Id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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
  `visitPriority` char(5) DEFAULT '',
  `rn_Id` int(2) DEFAULT NULL,
  PRIMARY KEY (`pt_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `ptTable` WRITE;
/*!40000 ALTER TABLE `ptTable` DISABLE KEYS */;

INSERT INTO `ptTable` (`pt_Id`, `ptFirstName`, `ptLastName`, `streetAddress`, `city`, `state`, `zipcode`, `telephone`, `ptHomeLng`, `ptHomeLat`, `nursingNeed`, `visitPriority`, `rn_Id`)
VALUES
	(1,'Mabel','Horsefeathers','2706 Durham-Chapel Hill Blvd','Durham','NC',27707,9195564477,-78.9318,35.9762,'IV Abx','Low',1),
	(2,'Euthamia','Greene','4809 Friends School Rd','Durham','NC',27705,9199873848,-79.0229,36.015,'New pt assessment','High',1),
	(3,'Edward','Gorey','2301 Erwin Rd','Durham','NC',27710,9192341234,-78.9373,36.0081,'Increasing pain','Low',1),
	(4,'Elizabeth','Jennings','3325 Roxboro St','Durham','NC',27704,9198675462,-78.892,36.0378,'TPN','Low',1),
	(5,'Gabriel','Byrne','2020 Chapel Hill Rd','Durham','NC',27707,9196765847,-78.9282,35.9908,'Psych screening','Low',1),
	(6,'Byron','Jones','1920 Cook Rd','Durham','NC',27713,9191239283,-78.9228,35.9358,'Wound care','Low',1),
	(7,'Sam','Nunn','','','',NULL,0,-79.0234,35.8624,'TPN','Low',2),
	(8,'Donald','Duck','','','',NULL,0,-78.9288,35.818,'Wound care','Low',2),
	(9,'Henry','Ford','','','',NULL,0,-78.9579,36.0867,'Increasing pain\n','Low',2),
	(10,'Thomas','Edison','','','',NULL,0,-78.8067,36.0273,'IV Abx','Low',2),
	(11,'Amelia','Earhart','','','',NULL,0,-78.979,36.0132,'Wound care','Low',2),
	(12,'Oprah','Winfrey','','','',NULL,0,-78.9458,35.9208,'New pt assessment','High',2),
	(13,'Jules','Verne','','','',NULL,0,-78.8766,35.996,'IV Abx','High',3),
	(14,'Katerina','Porokova','','','',NULL,0,-78.9597,36.1047,'Wound care','Low',3),
	(15,'Francis','Darcy','','','',NULL,0,-78.9592,35.9449,'Psych screening','Low',3),
	(16,'Francois','Benoit','','','',NULL,0,-78.9926,35.9716,'Increasing pain','Low',3),
	(17,'Sam','Bush','','','',NULL,0,-78.8382,36.0516,'Hearing test','Low',3),
	(18,'Jeremy','Smith','','','',NULL,0,-78.7776,36.0374,'New pt assessment','Low',3),
	(19,'Patty','Smith','','','',NULL,0,-78.8808,35.9854,'TPN','Low',4),
	(20,'Winifred','Perkins','','','',NULL,0,-78.9879,35.9817,'IV fluids','Low',4),
	(21,'Emily','Hankins','','','',NULL,0,-78.897,36.0711,'Wound care','High',4),
	(22,'Jonah','Berg','','','',NULL,0,-78.8705,35.9156,'IV Abx','Low',4),
	(23,'Mayme','Anderson','','','',NULL,0,-78.8255,35.9702,'New pt assessment','Low',4),
	(24,'Anthony','Hopkins','','','',NULL,0,-78.9466,36.0831,'Increasing pain','Low',4),
	(25,'Homer','Simpson','','','',NULL,0,-78.8932,35.9806,'Wound care','Low',5),
	(26,'Lisa','Simpson','','','',NULL,0,-79.0007,35.987,'Hearing test','Low',5),
	(27,'Bart','Simpson','','','',NULL,0,-78.8704,36.0609,'Increasing pain','Low',5),
	(28,'Marge','Simpson','','','',NULL,0,-78.8097,35.988,'Psych screening','High',5),
	(29,'Frederick','Douglass','','','',NULL,0,-78.9928,36.9679,'New pt assessment','Low',5),
	(30,'Queen','Latifah','','','',NULL,0,-78.9174,35.9567,'TPN','Low',5),
	(31,'Beastie','Boy','','','',NULL,0,-78.9101,36.0099,'Increasing pain','Low',6),
	(32,'Chuck','Taylor','','','',NULL,0,-78.7935,35.9693,'New pt assessment','High',6),
	(33,'Wallace','SImpson','','','',NULL,0,-78.8834,36.0645,'Wound care','Low',6),
	(34,'Cornelia','Smithfield','','','',NULL,0,-78.8954,35.9441,'Wound care','Low',6),
	(35,'Angus','Young','','','',NULL,0,-78.8427,36.0465,'TPN','Low',6),
	(36,'Ozzie','Osborne','','','',NULL,0,-78.9883,36.0672,'Hearing test','Low',6);

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
  `rnOfficeLng` float NOT NULL,
  `rnOfficeLat` float NOT NULL,
  `rnHomeLng` float DEFAULT NULL,
  `rnHomeLat` float DEFAULT NULL,
  PRIMARY KEY (`rn_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `rnTable` WRITE;
/*!40000 ALTER TABLE `rnTable` DISABLE KEYS */;

INSERT INTO `rnTable` (`rn_Id`, `rnFirstName`, `rnLastName`, `pt_id1`, `pt_id2`, `pt_id3`, `pt_id4`, `pt_id5`, `pt_id6`, `rnOfficeLng`, `rnOfficeLat`, `rnHomeLng`, `rnHomeLat`)
VALUES
	(1,'Margo','Beasley',1,2,3,4,5,6,-78.9014,35.996,-78.9371,35.9285),
	(2,'Elizabeth','Jennings',7,8,9,10,11,12,-78.9014,35.996,-78.9371,35.9285),
	(3,'Mark','Jones',13,14,15,16,17,18,-78.9014,35.996,-78.9371,35.9285),
	(4,'Stephen','Kimmel',19,20,21,22,23,24,-78.9014,35.996,-78.9371,35.9285),
	(5,'Wendy','Rhodes',25,26,27,28,29,30,-78.9014,35.996,-78.9371,35.9285),
	(6,'Philip','Thorpe',31,32,33,34,35,36,-78.9014,35.996,-78.9371,35.9285);

/*!40000 ALTER TABLE `rnTable` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
