DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUser`(
	IN uId int unsigned,
    IN fname varchar(255),
    IN lname varchar(255),
    IN email varchar(255),
    IN mno varchar(10)
)
BEGIN
	UPDATE userDetails
    SET 
		firstName = fname,
        lastName = lname,
        emailId = email,
        mobileNo = mno
	WHERE userId = uId;
END$$
DELIMITER ;
