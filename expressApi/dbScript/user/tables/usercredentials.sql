USE renttrackingdb;

CREATE TABLE `usercredentials` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `userPassword` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName` (`userName`)
);

CREATE TABLE `userdetails` (
	userId int unsigned NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    emailId varchar(255) NOT NULL,
    mobileNo varchar(12) NOT NULL,
    UNIQUE KEY emailId (emailId),
    FOREIGN KEY (userId) REFERENCES userCredentials(userId) ON DELETE CASCADE
);~