
CREATE TABLE IF NOT EXISTS `roda_reports` (
  `name` varchar(50) DEFAULT NULL,
  `report` longtext DEFAULT NULL,
  `solved` tinyint(4) DEFAULT 0,
  `reportid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`reportid`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;