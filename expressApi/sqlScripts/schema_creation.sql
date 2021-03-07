USE renttracking;
DROP TABLE IF EXISTS flat;
CREATE TABLE flat(
					flatid INT NOT NULL PRIMARY KEY,
                    floor VARCHAR(15), 
                    isMaintained BIT NOT NULL
);
DROP TABLE IF EXISTS tenant;
CREATE TABLE tenant(tenantid INT AUTO_INCREMENT PRIMARY KEY, 
					tenantname VARCHAR(50),
                    tenantaddress VARCHAR(255),
                    tenantmobilenumber BIGINT,
                    rentalagreementid INT,
                    checkindate DATE,
                    checkoutdate DATE null,
                    rentamount BIGINT,
                    flatid int
);
DROP TABLE IF EXISTS rentalagreement;
CREATE TABLE rentalagreement(
					rentalagreementid INT AUTO_INCREMENT PRIMARY KEY,
                    createddate date,
                    enddate date
);
                    