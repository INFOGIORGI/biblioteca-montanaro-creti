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

@app.route("/addLibro", methods = ["POST"])
def addLibro():
    data = request.get_json()
    isbn = data.get("isbn")
    titolo = data.get("titolo")
    anno = data.get("anno")
    autore = data.get("autore")
    genere = data.get("genere")

    try:
        autoreId = db.Autori.getById(nome=autore)

        if not autoreId[0][0]:
            return jsonify({"message": "errore"}), 500

        db.Libri.insert(ISBN=isbn, titolo=titolo, genere=genere, dataPub=anno)

        libroId = db.Libri.getById(titolo=titolo)

        
        print(autoreId[0], libroId[0])
        db.Produzioni.insert(idAutore=autoreId[0][0],idLibro=libroId[0][0])
        return jsonify({"message": "operazione riuscita"}), 200
    except Exception as e:
        print(f"errore: {e}")
        return jsonify({"message": "errore"}), 500


app.run(debug=True)
