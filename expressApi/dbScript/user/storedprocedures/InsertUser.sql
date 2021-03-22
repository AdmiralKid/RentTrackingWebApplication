DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertUser`(
	IN uname varchar(255),
    IN pass varchar(255),
    IN fname varchar(255),
    IN lname varchar(255),
    IN email varchar(255),
    IN mno varchar(255)
)
BEGIN
	DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE `uid` int DEFAULT -1;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    START TRANSACTION;
    INSERT INTO `usercredentials` (`userName`, `userPassword`) VALUES (MD5(uname), MD5(pass));
    COMMIT;
    SELECT userId INTO `uid` from `UserCredentials` WHERE userName = MD5(uname);
    INSERT INTO `userdetails` VALUES (`uid`, fname, lname , email, mno);
    IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
    SELECT `uid`;
END$$
DELIMITER ;
