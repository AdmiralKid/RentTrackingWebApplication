DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteUser`(
	IN uId int
)
BEGIN
	DECLARE state BIT;
	SET state = 1;
    IF(SELECT 1 FROM UserCredentials WHERE userId = uId)
    THEN
		DELETE FROM UserCredentials WHERE userId = uId;
	ELSE
		SET state = 0;
	END IF;
    SELECT state;
END$$
DELIMITER ;
