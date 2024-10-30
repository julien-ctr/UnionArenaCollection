CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    creationDate DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Series (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS Extension (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    seriesId INT,
    FOREIGN KEY (seriesId) REFERENCES Series(id)
);

CREATE TABLE IF NOT EXISTS FollowedExtension (
    userId INT,
    extensionId INT,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (extensionId) REFERENCES Extension(id)
);

CREATE TABLE IF NOT EXISTS Rarity (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    acronym VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Card (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    rarityId INT,
    extensionId INT,
    color VARCHAR(50) NOT NULL,
    cardCode VARCHAR(50) NOT NULL,
    alt BIT(1) NOT NULL,
    imagePath VARCHAR(200),
    description VARCHAR(400),
    FOREIGN KEY (rarityId) REFERENCES Rarity(id),
    FOREIGN KEY (extensionId) REFERENCES Extension(id)
);

CREATE TABLE IF NOT EXISTS CardOwnership (
    userId INT,
    cardId INT,
    amount INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (cardId) REFERENCES Card(id)
);

INSERT INTO Rarity (name, acronym) VALUES ('Common', 'C');
INSERT INTO Rarity (name, acronym) VALUES ('Uncommon', 'U');
INSERT INTO Rarity (name, acronym) VALUES ('Uncommon ★', 'U★');
INSERT INTO Rarity (name, acronym) VALUES ('Rare', 'R');
INSERT INTO Rarity (name, acronym) VALUES ('Rare ★', 'R★');
INSERT INTO Rarity (name, acronym) VALUES ('Super Rare', 'SR');
INSERT INTO Rarity (name, acronym) VALUES ('Super Rare ★', 'SR★');
INSERT INTO Rarity (name, acronym) VALUES ('Super Rare ★★', 'SR★★');
INSERT INTO Rarity (name, acronym) VALUES ('Super Rare ★★★', 'SR★★★');
INSERT INTO Rarity (name, acronym) VALUES ('Action Point', 'AP');