from flask import Flask, render_template, url_for, request, flash, redirect, jsonify
from _libs.db import Database
import random
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS

app = Flask(__name__)
#app.config["SESSION_TYPE"] = "filesystem"  # Memorizza le sessioni sul disco
#app.config["SESSION_PERMANENT"] = False
#app.config['SESSION_COOKIE_HTTPONLY'] = True
#app.config["SESSION_USE_SIGNER"] = True
#app.config["SESSION_KEY_PREFIX"] = "myapp_"

#session(app)  # Inizializza Flask-Session
CORS(app)
with app.app_context():  
    db = Database(app)


app.secret_key = "805921396246298444962129118" 

@app.route("/")
def hello() -> str:
    return render_template("index.html", message='Ciao mondo!!')

@app.route("/api/addLibro", methods = ["POST"])
def addLibro():
    #if not session.get("isAdmin"):
    #    return jsonify({"ERROR": "ACCESSO NEGATO"}, 403)
        
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
        print(libroId[0][3])
        db.Catalogo.insert(idLibro=libroId[0][0],indice=0,sezione=libroId[0][3], disponibile=True)

        
        
        db.Produzioni.insert(idAutore=autoreId[0][0],idLibro=libroId[0][0])
        return jsonify({"message": "operazione riuscita"}), 200
    except Exception as e:
        print(f"errore: {e}")
        return jsonify({"message": "errore"}), 500
    
@app.route("/api/addAutore", methods=["POST"])
def addAutore():
    #if not session.get("isAdmin"):
    #    return jsonify({"ERROR": "ACCESSO NEGATO"}, 403)

    data = request.get_json()
    nome = data.get("nome")
    cognome = data.get("cognome")
    dataNascita = data.get("DataNascita")
    dataMorte = data.get("DataMorte")
    bio = data.get("bio")

    if not dataMorte:
        db.Autori.insert(nome=nome, cognome=cognome,DataNascita=dataNascita, bio=bio)
        return jsonify({"Success":"OK"}), 200
    elif dataMorte:
        db.Autori.insert(nome=nome, cognome=cognome,DataNascita=dataNascita,dataMorte=dataMorte, bio=bio)
        return jsonify({"Success":"OK"}), 200

    return jsonify({"ERROR": "500"}), 500

@app.route("/api/ricercaChiave", methods=["POST"])
def cercaPerChiave():
    data = request.get_json()
    query = data.get("query")
    dati = db.Libri.searchLike(titolo=query)

    dati_dict = [{"id": row[0], "ISBN": row[1], "titolo": row[2], "genere": row[3], "dataPub": row[4]} for row in dati]
    print(dati_dict)
    return jsonify(dati_dict if dati else [])

@app.route("/api/Libri", methods=["GET"])
def apiLibri():
    dati = db.Libri.getLibriConAutori()
    dict = [{"id": row[0], "ISBN": row[1], "titolo": row[2], "genere": row[3], "dataPub": row[4], "nomeAutore": row[5], "cognomeAutore": row[6]} for row in dati]
    return jsonify(dict if dati else []), 200

@app.route("/api/getGeneri", methods=["GET"])
def getGeneri():
    dati = db.Libri.getGeneri()
    json_ret = [{"genere": row[0]} for row in dati]
    return jsonify(json_ret if dati else [])

@app.route("/api/register", methods=["POST"])
def register():
    """
    solo l'admin puó aggiungere gli utenti quindi controlliamo se abbia il token
    """

    """
    if not session.get("isAdmin"):
        return jsonify({"ERROR": "ACCESSO NEGATO"}, 403)
    """

    json = request.get_json()
    user: dict[str, str] = {}
    user["idTessera"] = numeri_casuali = ''.join(random.choices('0123456789', k=16))
    user["name"] = json.get("name")
    user["surname"] = json.get("surname")
    user["password"] = json.get("password")
    user["confirm_password"] = json.get("confirm_password")
    user["telefono"] = json.get("telefono")
    user["email"] = json.get("email")

    print(user)
    

    if user["password"] != user["confirm_password"]:
        return jsonify({"error": "Le password non coincidono"}), 400

    user["password"] = generate_password_hash(user["password"])
    
    if not db.Tessere.insert(idTessera=user["idTessera"],email=user["email"], password=user["password"], tel=user["telefono"]):
        return jsonify({"error": "Problema con i parametri tessera"}), 400

    if db.Utenti.insert(idTessera=user["idTessera"],nome=user["name"], cognome=user["surname"]) == True:
        return jsonify({"SUCCESSO":"OK"}), 200
    
    
    return jsonify({"error": "Problema con i parametri"}), 400

@app.route("/api/login", methods=["POST"])
def login():

    json = request.get_json()
    
    idTessera = json.get("idTessera")
    email = json.get("email")
    password = json.get("password")
    

    print(idTessera)
    # Verifica se l'ID tessera è presente nel database
    user_by_id = db.Tessere.getById(idTessera=idTessera)  # Supponiamo che db.Tessere.getById ritorni una lista
    print(user_by_id[0][1], email)
    
    if user_by_id:
        # Confronta la password con quella memorizzata
        if not check_password_hash(user_by_id[0][2], password) or user_by_id[0][1] != email:  # La password è nella posizione 2
            return jsonify({"error": "credenziali non valide"}), 400
        # Login riuscito
        return jsonify({"message": "Login effettuato con successo", "idTessera": user_by_id[0][0]}), 200

    
    

    return jsonify({"error": "Utente non trovato"}), 404

@app.route("/api/prestito")
def prestito():
    json = request.get_json()
    idLibro = json.get("idLibro")
    idTessera = json.get("idTessera")
    dataInizio = json.get("dataInizio")

    db.Catalogo()
    
@app.route("/api/Catalogo", methods=["GET"])
def catalogo():
    dati = db.Catalogo.getCatalogo()
    dict = [{"titolo": row[0], "genere": row[1], "disponibile": row[2]} for row in dati]
    return jsonify(dict if dati else []), 200



app.run(host="0.0.0.0", port=5000, debug=True)