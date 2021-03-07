DROP PROCEDURE IF EXISTS TenantCreate;
DELIMITER //
CREATE PROCEDURE `TenantCreate`(
IN tenantnamevalue VARCHAR(50),
IN tenantaddressvalue VARCHAR(255),
IN tenantmobilenumbervalue BIGINT,
IN rentalagreementidvalue INT,
IN checkindatevalue DATE,
IN checkoutdatevalue DATE,
IN rentamountvalue BIGINT,
IN flatidvalue int
)
BEGIN
	insert into `tenant` (`tenantname`, `tenantaddress`, `tenantmobilenumber`, `rentalagreementid`, `checkindate`, `checkoutdate`, `rentamount`, `flatid`)
	VALUES (tenantnamevalue, tenantaddressvalue, tenantmobilenumbervalue, rentalagreementidvalue, checkindatevalue, checkoutdatevalue, rentamountvalue,flatidvalue);
END //

DELIMITER ;