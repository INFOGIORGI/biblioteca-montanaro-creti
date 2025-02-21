from flask import Flask, render_template, url_for, request, flash, redirect, jsonify
from _libs.db import Database
from _libs.models import *
from _libs.utils import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
with app.app_context():  
    db = Database(app)




@app.route("/")
def hello() -> str:
    return render_template("index.html", message='Ciao mondo!!')

@app.route("/api/addLibro", methods = ["POST"])
def addLibro():
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
    return jsonify(dict if dati else [])
app.run(debug=True)
