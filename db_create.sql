-- books_db.books definition

CREATE TABLE `books` (
                         `TITLE` varchar(100) DEFAULT NULL,
                         `AUTHOR` varchar(100) DEFAULT NULL,
                         `ID` int NOT NULL AUTO_INCREMENT,
                         PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;