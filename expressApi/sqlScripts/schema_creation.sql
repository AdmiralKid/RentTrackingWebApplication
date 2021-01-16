DROP DATABASE renttracking;
CREATE DATABASE renttracking;
USE renttracking;
CREATE TABLE flat(
					flatid INT NOT NULL PRIMARY KEY, 
					currenttenantid INT, 
                    floor VARCHAR(15), 
                    isMaintained BIT NOT NULL
);

CREATE TABLE tenant(tenantid INT AUTO_INCREMENT PRIMARY KEY, 
					tenantname VARCHAR(50),
                    tenantaddress VARCHAR(255),
                    tenantmobilenumber BIGINT,
                    rentalagreementid INT,
                    checkindate DATE,
                    checkoutdate DATE null,
                    rentamount BIGINT                    
);

CREATE TABLE rentalagreement(
					rentalagreementid INT AUTO_INCREMENT PRIMARY KEY,
                    createddate date,
                    enddate date
);
                    
					
							
                    
                    