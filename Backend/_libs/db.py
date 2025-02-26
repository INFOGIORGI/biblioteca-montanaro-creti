from flask_mysqldb import MySQL
import os
from typing import TYPE_CHECKING
import re
import threading
import time
import json
from datetime import date, datetime


class Database:
    def __init__(self, app ):
        
        #db var
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
        self.tables = cursor.fetchall()
        cursor.close()

        

      

    

        

        # Creazione dinamica dei modelli per ogni tabella
        for (table_name,) in self.tables:
            print(f"tabella trovata: {table_name}")

            model = BaseModel(table_name, self)
            if table_name.lower() == "libri":
                setattr(model, "getLibriConAutori", self.getLibriConAutori.__get__(model)) # setto un metodo custom solo all'istanza con nome "Libri" quella get mi serve per richiamare l'istanza correttamente
                setattr(model, "getGeneri", self.getGeneri.__get__(model)) # setto un metodo custom solo all'istanza con nome "Libri" quella get mi serve per richiamare l'istanza correttamente

            setattr(self, table_name, model) 
        
        #thread var
        self.running = False
        self.thread = None
        self.startService()
    


    def converti_dati(self, dati, column_names):
        """
        praticamente converti valore mi controlla se quel valore é un istanza di date o datetime 
        e se lo é me la converte in un formato testuale leggibile con la notazione ISO
        obv gli passo tutta la tupla e solo se trova un valore con il formata data agisce e solo
        su quel valore

        -christian 
        """
        def converti_valore(val):
            if isinstance(val, (date, datetime)):
                return val.isoformat()
            return val
        return [{column: converti_valore(value) for column, value in zip(column_names, row)} for row in dati]

    def scriviFile(self):
        """
        questa funzione é semi complessa ma una volta capita passa la paura
        in sostanza mi prendo le istanze create dal db a runtime model = getattr()
        mi prendo il nome delle tabelle e i dati e creo un json
        il tutto viene eseguito da un thread parallelo ogni 5 min
        
        praticamente ho convertito un mariaDB in un mongoDB

        -christian
        """
        while self.running:
            with self.app.app_context():
                try:
                    if not os.path.exists("dbjson"):
                        os.makedirs("dbjson")

                    for (table_name,) in self.tables:
                        model = getattr(self, table_name, None) # mi prendo l'istanza dell'oggeto corrente del db
                        if model is None:
                            print(f"⚠️ Errore: {table_name} non trovato nel Database!") # giustamente se non torna niente none esiste la tabella, puó succedere
                            continue

                        dati = model.getAll() 
                        if not dati:
                            print(f"Nessun dato trovato per la tabella {table_name}") # stessa cosa ma con i valori
                            continue

                        conn = self.getConn()
                        cursor = conn.cursor()
                        cursor.execute(f"SELECT * FROM {table_name} LIMIT 1") # faccio una query che mi torna una sola tupla per non sprecare risorse perché mi serve solo per il nomme delle colonne
                        column_names = [desc[0] for desc in cursor.description] # me li prendo medianete cursor.description
                        cursor.close()

                        dati_json = self.converti_dati(dati, column_names)

                        file_path = f"dbjson/{table_name}.json"
                        with open(file_path, "w", encoding="utf-8") as f:
                            json.dump(dati_json, f, indent=4, ensure_ascii=False)

                        print(f"✅ File {file_path} aggiornato con successo!")
                except Exception as e:
                    print(f"❌ Errore durante la scrittura dei file JSON: {e}")
            time.sleep(300)


    def startService(self):
        if not self.running:
            self.running = True
            self.thread = threading.Thread(target=self.scriviFile, daemon=True)
            self.thread.start()
            print(f"thread avviato a {self.thread}")
    
    def stopService(self):
        if self.thread:
            self.thread.join()
            print(f"{self.thread} terminato")


    def getGeneri(self):
        _conn = self.db.getConn()
        with _conn.cursor() as cursor:
            try:
                query = """SELECT DISTINCT genere FROM Libri"""
                cursor.execute(query)
                dati = cursor.fetchall()
                return dati 
            except Exception as e:
                print(f"c'e stato un errore con il db {e}")
                return ()

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
