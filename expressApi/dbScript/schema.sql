CREATE TABLE User(
	userId INT AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    PRIMARY KEY(userId)
);

CREATE TABLE UserDetails (
	userId INT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    emailId VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,    
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE Flat (
	flatId INT AUTO_INCREMENT,
    ownerId INT,
    flatName VARCHAR(50),
    bhk INT,
    isFurnished BOOLEAN,
    rentPerMonth DOUBLE,
    PRIMARY KEY(flatId),
    FOREIGN KEY(ownerId) REFERENCES User(userId)
);

CREATE TABLE FlatLog (
	flatId int NOT NULL,
    tenantId INT NOT NULL,
    checkIn DATE NOT NULL,
    checkout DATE,
    FOREIGN KEY(flatId) REFERENCES Flat(flatId),
    FOREIGN KEY(tenantId) REFERENCES User(userId)
);