from flask_mysqldb import MySQL
import os
from typing import TYPE_CHECKING
import re


class Database:
    def __init__(self, app ):
        
        self.app = app
        self.app.config['MYSQL_HOST'] = "138.41.20.102"
        self.app.config['MYSQL_USER'] = "5di"
        self.app.config['MYSQL_PASSWORD'] = "colazzo"
        self.app.config['MYSQL_DB'] = "montanaro_creti"
        self.app.config['MYSQL_PORT'] = 53306
        self.mysql = MySQL(self.app)

        # Connessione per ottenere le tabelle
        conn = self.mysql.connection
        cursor = conn.cursor()
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        cursor.close()

        

        # Creazione dinamica dei modelli per ogni tabella
        for (table_name,) in tables:
            print(f"tabella trovata: {table_name}")

            model = BaseModel(table_name, self)
            if table_name.lower() == "libri":
                setattr(model, "getLibriConAutori", self.getLibriConAutori.__get__(model)) # setto un metodo custom solo all'istanza con nome "Libri" quella get mi serve per richiamare l'istanza correttamente

            setattr(self, table_name, model) 

    def getLibriConAutori(self):
        _conn = self.db.getConn()
        with _conn.cursor() as cursor:
            try:
                query = """
                        SELECT L.*, A.nome, A.cognome
                        FROM Libri AS L
                        INNER JOIN Produzioni AS P ON L.id = P.idLibro
                        INNER JOIN Autori AS A ON P.idAutore = A.id;

                        """
                cursor.execute(query)
                dati = cursor.fetchall()
                if not dati:
                    return ()
                return dati
            except Exception as e:
                print(f"errore con la query {e}")
                return ()

    
    def getConn(self):
        return self.mysql.connection
    
    def getTables(self) -> tuple[tuple]:
        _conn = self.getConn()
        with _conn.cursor() as cursor:
            try:
                query: str = "SHOW TABLES"
                cursor.execute(query)
                tables = cursor.fetchall()
                return tables
            except Exception as e:
                print(f"errore con il fetch delle tabelle {e}")
                return ()



class BaseModel:
    def __init__(self, table_name, db: Database):
        self.table_name = table_name
        self.db = db

    def getAll(self) -> tuple[tuple]:
        try:
            conn = self.db.getConn()
            with conn.cursor() as cursor:
                query = f"SELECT * FROM {self.table_name}"
                cursor.execute(query)
                dati = cursor.fetchall()
                return dati
        except Exception as e:
            print(f"Errore durante il recupero dei dati: {e}")
            return ()
        
    def getById(self, **id: str) -> tuple[tuple]:
        try:
            conn = self.db.getConn()
            with conn.cursor() as cursor:
                attr, value = next(iter(id.items()))
                query = f"SELECT * FROM {self.table_name} WHERE {attr} = %s"
                print(query)
                cursor.execute(query, (value,))
                dati = cursor.fetchall()
                return dati
        except Exception as e:
            print(f"Errore durante il recupero dei dati: {e}")
            return ()
        
    def insert(self, **attr) -> bool:
        try:
            conn = self.db.getConn()
            with conn.cursor() as cursor:
                colonne = ', '.join(attr.keys())
                values = ', '.join(["%s"] *len(attr)) # metto i %s
                query = f"INSERT INTO {self.table_name} ({colonne}) VALUES ({values})"
               
                cursor.execute(query, tuple(attr.values()))
                conn.commit()
                return True
        except Exception as e:
            print(f"errore durante l'insert {e}")
            return False
        
    def deleteById(self, **id)-> bool:
        try:
            conn = self.db.getConn()
            with conn.cursor() as cursor:
                attr, value = next(iter(id.items()))
                query = f"DELETE FROM {self.table_name} WHERE {attr} = %s"
                cursor.execute(query, (value,))
                conn.commit()
                return True
        except Exception as e:
            print(f"errore durante la delete {e}")
            return False 
        
    def update(self, **attr) -> bool:
        try:
            conn = self.db.getConn()
            with conn.cursor() as cursor:
                condition = attr.pop("WHERE", "")
                values = list(attr.values())
                query: str = f"UPDATE {self.table_name} SET "

                for colonna in attr.keys():
                    query += f"{colonna} = %s, "
                
                query = query[:-2]

                if condition:
                    operators = r"(\w+)\s*(=|!=|<|>|<=|>=|LIKE|IN)\s*(.+)" #espressione regolare che mi verifica se ci sono almeno un operatore
                    #per vedere se l'espressione é valida (\w) colonna e (.+) parametri
                    #query += f" WHERE {condition}"
                
                    isFormatted = re.match(operators, condition, re.IGNORECASE)
                    
                    if isFormatted:
                        colonna, operatore, valore = isFormatted.groups()
                        query += f" WHERE {colonna.strip()} {operatore.strip()} %s"
                        values.append(valore)
                cursor.execute(query, tuple(values))
                conn.commit()
                
                return True
        except Exception as e:
            print(f"errore durante la update {e}")
            return False
    
    def searchLike(self, **attr) -> tuple[tuple]:
        try:
            values = list(attr.values())  # Converti in lista per indicizzare
            keyword = list(attr.keys())  # Converti in lista per indicizzare
            conn = self.db.getConn()
            with conn.cursor() as cursor:
                query = f"SELECT * FROM {self.table_name} WHERE {keyword[0]} LIKE %s"
                cursor.execute(query, (f"{values[0]}%",))  # Passa come tupla
                dati = cursor.fetchall()
                return dati
        except Exception as e:
            print(f"errore durante la query {e}")    
            return ()
