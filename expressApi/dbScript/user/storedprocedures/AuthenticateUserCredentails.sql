DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AuthenticateUserCredentials`(
	IN uname varchar(30),
    IN pass varchar(30)
)
BEGIN
	SELECT userId FROM UserCredentials WHERE userName = MD5(uname) AND userPassword = MD5(pass);
END$$
DELIMITER ;

