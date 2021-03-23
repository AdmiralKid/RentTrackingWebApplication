DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ChangePassword`(
	IN uId int unsigned,
    IN newpass varchar(255)
)
BEGIN
	UPDATE usercredentials
    SET userPassword = MD5(newpass)
    WHERE userId = uId;
END$$
DELIMITER ;
