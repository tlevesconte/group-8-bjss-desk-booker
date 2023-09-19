Create schema IF NOT EXISTS mybookingsdemo;
use mybookingsdemo;
	
DROP TABLE IF EXISTS desk_Status;
DROP TABLE IF EXISTS desk_pos;
DROP TABLE IF EXISTS canvas_item;
DROP TABLE IF EXISTS myBookings;
DROP TABLE IF EXISTS office_pos; 
CREATE TABLE IF NOT EXISTS `Desk_Status` (
	`ID` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `desk_id` INTEGER NOT NULL,
    `desk_type` TEXT NOT NULL,
    `bookedDate` TEXT NOT NULL,
    `bookedName` TEXT NOT NULL,
	`cities` TEXT NOT NULL,
    `bookedReason` TEXT
);
CREATE TABLE IF NOT EXISTS `Desk_pos` (
	`ID` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `desk_id` INTEGER,
	`desk_type` TEXT NOT NULL,
	`Desk_position` TEXT NOT NULL,
	`cities` TEXT NOT NULL

);
CREATE TABLE IF NOT EXISTS `canvas_item` (
	`ID` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`canvas_id` INTEGER NOT NULL,
	`canvas_type` INTEGER NOT NULL,
	`canvas_data` TEXT NOT NULL,
	`cities` TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS `MyBookings` (
	`ID` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`firstName` TEXT NOT NULL,
	`surname` TEXT NOT NULL,
	`employeeCode` INTEGER NOT NULL,
	`phoneNumber` INTEGER NOT NULL,
	`deskFacility` TEXT NOT NULL,
	`reason` TEXT NOT NULL,
	`email` TEXT NOT NULL,
	`bookingstarttime` TEXT NOT NULL,
	`bookingendtime` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `office_pos` (
	`ID` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `cities` TEXT NOT NULL
);
INSERT INTO `office_pos` (`ID`, `cities`) VALUES (1, 'bristol');
INSERT INTO `office_pos` (`ID`, `cities`) VALUES (2, 'cardiff');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (1,0,0,'[15,15,810,15]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (2,1,0,'[810,14,988,496]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (3,2,0,'[988,496,724,594]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (4,3,0,'[15,15,15,299]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (5,4,0,'[15,299,615,299]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (6,5,0,'[724,594,615,299]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (7,6,0,'[40,96,140,96]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (8,7,0,'[140,16,140,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (9,8,0,'[141,86,231,86]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (10,9,0,'[231,86,231,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (11,10,0,'[185,87,185,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (12,11,0,'[232,144,218,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (13,12,0,'[199,144,171,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (14,13,0,'[140,144,153,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (15,14,0,'[260,15,260,145]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (16,15,0,'[260,95,311,95]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (17,16,0,'[306,95,306,112]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (18,17,0,'[306,145,306,128]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (19,18,0,'[328,15,328,96]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (20,19,0,'[395,117,363,117]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (21,20,0,'[344,95,363,95]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (22,21,0,'[363,145,363,94]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (23,22,0,'[381,144,363,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (24,23,0,'[260,144,345,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (25,24,0,'[396,15,396,145]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (26,25,0,'[396,144,413,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (27,26,0,'[412,143,412,114]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (28,27,0,'[397,70,427,70]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (29,28,0,'[426,70,426,39]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (30,29,0,'[425,39,440,39]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (31,30,0,'[425,69,478,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (32,31,0,'[440,144,499,144]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (33,32,0,'[235,170,235,219]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (34,33,0,'[235,170,352,170]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (35,34,0,'[351,169,351,244]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (36,35,0,'[351,243,235,243]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (37,36,0,'[818,479,833,521]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (38,37,0,'[839,535,844,549]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (39,38,0,'[698,523,826,477]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (40,39,0,'[842,471,897,451]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (41,40,0,'[878,535,854,468]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (42,41,0,'[944,512,919,444]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (43,42,0,'[962,426,937,435]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (44,0,1,'[40,60,\"Secret Room\",14]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (45,1,1,'[260,210,\"Shark Tank\",14]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (46,2,1,'[860,480,\"Lava Pit\",14]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (47,3,1,'[940,490,\"Trash Compactor\",12]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (48,4,1,'[450,260,\"NSD\",14]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (49,5,1,'[580,220,\"Whiteboards\",14]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (50,6,1,'[540,100,\"Bleachers\",14]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (51,0,2,'[705,25,8,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (52,1,2,'[625,55,5,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (53,2,2,'[635,75,4,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (54,3,2,'[435,45,6,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (55,4,2,'[405,74,4,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (56,5,2,'[273,112,0,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (57,6,2,'[285,45,3,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (58,7,2,'[355,45,2,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (59,8,2,'[805,455,4,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (60,9,2,'[175,105,1,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (61,10,2,'[145,215,7,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (62,11,2,'[35,105,4,20]','bristol');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (63,0,0,'[185,95,185,425]','cardiff');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (64,1,0,'[185,95,365,95]','cardiff');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (65,2,0,'[365,95,365,425]','cardiff');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (66,3,0,'[365,425,185,425]','cardiff');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (67,0,1,'[330,187,\"Television\",14]','cardiff');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (68,1,1,'[363,273,\"Entrance\",14]','cardiff');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (69,2,1,'[236,139,\"No Monitors\",14]','cardiff');
INSERT INTO `canvas_item` (`ID`,`canvas_id`,`canvas_type`,`canvas_data`,`cities`) VALUES (70,3,1,'[214,347,\"No Monitors\",14]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (1,2,'desk','[375,235,90,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (2,3,'desk','[375,255,90,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (3,4,'desk','[375,215,90,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (4,5,'desk','[375,195,90,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (5,6,'desk','[395,215,270,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (6,7,'desk','[395,195,270,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (7,8,'desk','[395,255,270,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (8,9,'desk','[445,195,180,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (9,10,'desk','[465,215,0,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (10,11,'desk','[465,195,180,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (11,13,'desk','[505,255,90,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (12,14,'desk','[505,215,90,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (13,15,'desk','[505,235,90,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (14,16,'desk','[525,235,270,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (15,17,'desk','[525,215,270,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (16,18,'desk','[525,255,270,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (17,19,'desk','[525,195,270,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (18,21,'desk','[505,195,90,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (19,22,'desk','[691,56,75,11]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (20,23,'desk','[754,41,255,1]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (21,24,'desk','[766,84,255,1]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (22,25,'desk','[684,286,160,2]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (23,26,'desk','[643,301,160,2]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (24,28,'desk','[671,313,340,2]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (25,29,'desk','[779,209,340,1]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (26,30,'desk','[793,179,160,1]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (27,31,'desk','[825,191,340,1]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (28,33,'desk','[846,247,340,3]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (29,35,'desk','[799,264,340,3]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (30,37,'desk','[849,325,340,3]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (31,38,'desk','[897,373,160,2]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (32,39,'desk','[849,391,160,2]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (33,40,'desk','[710,423,160,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (34,41,'desk','[739,433,340,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (35,42,'desk','[697,450,340,0]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (36,43,'desk','[670,382,340,1]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (37,44,'desk','[715,366,340,1]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (38,-1,'desk','[0,1,12,20,27,32,34,36,45,46]','bristol');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (39,0,'desk','[268,379,90,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (40,1,'desk','[293,366,180,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (41,2,'desk','[319,366,180,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (42,3,'desk','[293,391,0,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (43,4,'desk','[319,391,0,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (44,5,'desk','[222,300,90,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (45,6,'desk','[245,311,0,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (46,7,'desk','[269,298,270,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (47,8,'desk','[245,286,180,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (48,9,'desk','[203,227,0,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (49,10,'desk','[227,227,0,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (50,11,'desk','[203,203,180,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (51,12,'desk','[227,203,180,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (52,13,'desk','[241,105,0,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (53,14,'desk','[265,105,0,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (54,15,'desk','[289,105,0,0]','cardiff');
INSERT INTO `Desk_pos` (`ID`,`desk_id`,`desk_type`,`Desk_position`,`cities`) VALUES (55,-1,'desk','[16]','cardiff');
