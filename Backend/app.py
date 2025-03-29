from flask import Flask, render_template, url_for, request, flash, redirect, jsonify, session
from _libs.db import Database
from _libs.utils import *
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
with app.app_context():  
    db = Database(app)


app.secret_key = "805921396246298444962129118" 

@app.route("/")
def hello() -> str:
    return render_template("index.html", message='Ciao mondo!!')

@app.route("/api/addLibro", methods = ["POST"])
def addLibro():
    if not session.get("isAdmin"):
        return jsonify({"ERROR": "ACCESSO NEGATO"}, 403)
    
    data = request.get_json()
    isbn = data.get("isbn")
    titolo = data.get("titolo")
    anno = data.get("anno")
    autore = data.get("autore")
    genere = data.get("genere")

    try:
        autoreId = db.Autori.getById(nome=autore)
       
        
        if not autoreId:
            return jsonify({"message": "errore"}), 400

        db.Libri.insert(ISBN=isbn, titolo=titolo, genere=genere, dataPub=anno)

        libroId = db.Libri.getById(titolo=titolo)

        
        
        db.Produzioni.insert(idAutore=autoreId[0][0],idLibro=libroId[0][0])
        return jsonify({"message": "operazione riuscita"}), 200
    except Exception as e:
        print(f"errore: {e}")
        return jsonify({"message": "errore"}), 500
    
@app.route("/api/addAutore", methods=["POST"])
def addAutore():
    if not session.get("isAdmin"):
        return jsonify({"ERROR": "ACCESSO NEGATO"}, 403)

    data = request.get_json()
    nome = data.get("nome")
    cognome = data.get("cognome")
    dataNascita = data.get("DataNascita")
    dataMorte = data.get("DataMorte")
    bio = data.get("bio")

    if not dataMorte:
        db.Autori.insert(nome=nome, cognome=cognome,DataNascita=dataNascita, bio=bio)
        return jsonify({"Success":"OK"},200)
    elif dataMorte:
        db.Autori.insert(nome=nome, cognome=cognome,DataNascita=dataNascita,dataMorte=dataMorte, bio=bio)
        return jsonify({"Success":"OK"},200)

    return jsonify({"ERROR": "500"}, 500)

@app.route("/api/ricercaChiave", methods=["POST"])
def cercaPerChiave():
    data = request.get_json()
    query = data.get("query")
    dati = db.Libri.searchLike(titolo=query)

    for row in dati:
        dati_dict = {"id": row[0], "ISBN": row[1], "titolo": row[2], "genere": row[3], "dataPub": row[4]}
    print(dati_dict)
    return jsonify(dati_dict if dati else [])

@app.route("/api/Libri", methods=["GET"])
def apiLibri():
    dati = db.Libri.getLibriConAutori()
    for row in dati:
        dict = {"id": row[0], "ISBN": row[1], "titolo": row[2], "genere": row[3], "dataPub": row[4], "nomeAutore": row[5], "cognomeAutore": row[6]}
    return jsonify(dict if dati else [])

@app.route("/api/getGeneri", methods=["GET"])
def getGeneri():
    dati = db.Libri.getGeneri()
    for row in dati:
        json_ret = {"genere": row[0]}
    return jsonify(json_ret if dati else [])

@app.route("api/register", methods=["POST"])
def register():
    """
    solo l'admin puó aggiungere gli utenti quindi controlliamo se abbia il token
    """
    if not session.get("isAdmin"):
        return jsonify({"ERROR": "ACCESSO NEGATO"}, 403)
    

    json = request.get_json()
    user: dict[str, str] = {}
    user["name"] = json.get("name")
    user["surname"] = json.get("surname")
    user["password"] = json.get("password")
    user["pswdConf"] = json.get("pswdConf")
    user["isAdmin"] = False

    if user["password"] is not user["pswdConf"] or isEmpty(list(user.values())):
        return jsonify({"error": "c'é un problema con i dati"})

    user["password"] = generate_password_hash(user["password"])
    user.pop("pswdConf")

    if db.Utenti.insert(nome=user["name"], cognome=user["surname"], password=user["password"]) == True:
        return jsonify({"SUCCESSO":"OK"}, 200)



app.run(host="0.0.0.0", port=5000, debug=True)
