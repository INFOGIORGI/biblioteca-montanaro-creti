-- Elimina prima le tabelle che dipendono da altre
DROP TABLE IF EXISTS Prestiti;
DROP TABLE IF EXISTS Utenti;
DROP TABLE IF EXISTS Produzioni;
DROP TABLE IF EXISTS Catalogo;
DROP TABLE IF EXISTS Libri;
DROP TABLE IF EXISTS Autori;
DROP TABLE IF EXISTS Tessere;

-- Creazione delle tabelle
CREATE TABLE IF NOT EXISTS Tessere(
        idTessera VARCHAR(16) PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        tel VARCHAR(12) NOT NULL,
        Ruolo VARCHAR(32) NOT NULL DEFAULT 'utente'
);

CREATE TABLE IF NOT EXISTS Utenti(
        idTessera VARCHAR(16) PRIMARY KEY,
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
        bio TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS Libri(
       id INT PRIMARY KEY AUTO_INCREMENT,
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
        idTessera VARCHAR(16) NOT NULL,
        dataInizio DATE NOT NULL,
        dataFine DATE NOT NULL,
        restituto BOOLEAN DEFAULT FALSE NOT NULL,
        FOREIGN KEY (idLibro) REFERENCES Libri(id) ON DELETE CASCADE,
        FOREIGN KEY (idTessera) REFERENCES Tessere(idTessera) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Catalogo(
        idLibro INT NOT NULL,
        sezione VARCHAR(255) NOT NULL,
        indice INT NOT NULL,
        disponibile BOOLEAN NOT NULL,
        FOREIGN KEY (idLibro) REFERENCES Libri(id) ON DELETE CASCADE
);

-- Inserimento dati
INSERT INTO Tessere (idTessera, email, password, tel, Ruolo)
VALUES ('1232131', 'mario.rossi@example.com', 'password123', '1234567890', 'utente');

INSERT INTO Utenti (idTessera, nome, cognome, numeroPrestiti)
VALUES ('1232131', 'Mario', 'Rossi', 2);

INSERT INTO Autori (nome, cognome, DataNascita, DataMorte, bio)
VALUES ('Giovanni', 'Verga', '1840-09-02', '1922-01-27', 'Autore italiano, conosciuto per la sua opera "I Malavoglia"');

INSERT INTO Libri (ISBN, titolo, genere, dataPub)
VALUES ('9788806201453', 'I Malavoglia', 'Narrativa', '1881-01-01');

INSERT INTO Produzioni (idAutore, idLibro)
VALUES (1, 1);

INSERT INTO Prestiti (idLibro, idTessera, dataInizio, dataFine, restituto)
VALUES (1, '1232131', '2025-02-01', '2025-02-15', FALSE);

INSERT INTO Catalogo (idLibro, sezione, indice, disponibile)
VALUES (1, 'Narrativa', 1, TRUE);
