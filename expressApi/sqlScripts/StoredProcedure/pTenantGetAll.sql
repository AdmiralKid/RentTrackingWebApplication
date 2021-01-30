DROP PROCEDURE IF EXISTS TenantGetAll;
DELIMITER //
CREATE PROCEDURE TenantGetAll()
BEGIN
	SELECT 
    T.tenantid, 
	T.tenantname,
	T.tenantaddress,
	T.tenantmobilenumber,
	T.rentalagreementid,
	T.checkindate,
	T.checkoutdate,
	T.rentamount,
    T.flatid
    FROM tenant T;
END //

DELIMITER ;