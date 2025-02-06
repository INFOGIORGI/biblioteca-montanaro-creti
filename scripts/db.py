"""

CREATE DATABASE Biblioteca;

USE Biblioteca;

CREATE TABLE IF NOT EXISTS Tessere(
        idTessera CHAR(39),
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        tel varchar(12) NOT NULL,
        PRIMARY KEY(idTessera)
);

CREATE TABLE IF NOT EXISTS Utenti (
    idTessera CHAR(39) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    numeroPrestiti INT DEFAULT 0,
    FOREIGN KEY (idTessera) REFERENCES Tessere(idTessera) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Autori(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        cognome VARCHAR(255) NOT NULL,
        DataNascita DATE NOT NULL,
        DataMorte DATE DEFAULT NULL,
        bio TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS Libri(
       ID INT PRIMARY KEY AUTO_INCREMENT,
       ISBN CHAR(13) NOT NULL,
       titolo VARCHAR(255) NOT NULL,
       genere VARCHAR(255) NOT NULL,
       dataPub DATE NOT NULL
);


CREATE TABLE IF NOT EXISTS Produzioni(
        idAutore INT NOT NULL,
        idLibro INT NOT NULL,
        FOREIGN KEY (idAutore) REFERENCES Autori(id) ON DELETE CASCADE,
        FOREIGN KEY (idLibro) REFERENCES Libri(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Prestiti(
        id INT AUTO_INCREMENT PRIMARY KEY,
        idLibro INT NOT NULL,
        idTessera CHAR(39) NOT NULL,
        dataInizio DATE NOT NULL,
        dataFine DATE NOT NULL,
        restituto BOOLEAN default False NOT NULL,
        FOREIGN KEY (idLibro) REFERENCES Libri(id) ON DELETE CASCADE,
        FOREIGN KEY (idTessera) REFERENCES Tessere(idTessera) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Catalogo(
        idLibro INT NOT NULL,
        sezione VARCHAR(255) NOT NULL,
        indice INT NOT NULL,
        disponibile BOOLEAN NOT NULL ,
        FOREIGN KEY (idLibro) REFERENCES Libri(id) ON DELETE CASCADE
);

"""

