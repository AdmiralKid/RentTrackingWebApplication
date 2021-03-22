DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserDetails`(
	uId int unsigned
)
BEGIN
	SELECT * FROM userDetails WHERE userId = uId;
END$$
DELIMITER ;
