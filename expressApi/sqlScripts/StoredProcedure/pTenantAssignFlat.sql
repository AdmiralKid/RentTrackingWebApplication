DROP PROCEDURE IF EXISTS TenantAssignFlat;
DELIMITER //
CREATE PROCEDURE `TenantAssignFlat`(
IN tenant int,
IN flat int
)
BEGIN
update tenant set `flatid` = flat where `tenantid` = tenant;
END //

DELIMITER ;