from typing import TypedDict

"""
qui ci scriviamo i modelli del db per rendere il codice piú elegante
e per evitare di scrivere in ogni metodo che richiama il db parametri chilometrici

GLI ATTRIBUTI DEI MODELLI DEVONO NECESSARIAMENTE MATCHARE I NOMI DELLE COLONNE DEL DB

per maggiori info vai su "/docs/models.md"

"""

class TesseraModel(TypedDict):
    idTessera: int
    email: str
    password: str
    tel: str

class UserModel(TypedDict):
    idTessera: int
    nome: str
    cognome: str
    numeroPrestiti: int
    
class AutoreModel(TypedDict):
    id: int
    nome: str
    cognome: str
    DataNascita: str
    DataMorte: str
    bio: str
    
class LibroModel(TypedDict):
    id: int
    ISBN: str
    titolo: str
    genere: str
    dataPub: str

class ProduzioneModel(TypedDict):
    idAutore: int
    idLibro: int

class PrestitoModel(TypedDict):
    id: int
    idLibro: int
    idTessera: int
    dataInizio: str
    dataFine: str
    restituito: bool
    






