from flask import Flask, render_template, url_for, request
from _libs.db import Database
from werkzeug.security import generate_password_hash, check_password_hash
from _libs.models import UserModel, TesseraModel
from _libs.utils import isEmpty, getReqParams
from uuid import uuid4

app = Flask(__name__)

with app.app_context():
    db: Database = Database(app)

users = ['Alice', 'Bob', 'Charlie'] 

@app.route("/")
def hello() -> str:
    return render_template("index.html", message='Ciao mondo!!')

@app.route("/users")
def user() -> str:
    return render_template('users.html', users=users)

@app.route("/user/<utente>") 
def utente(utente) -> str:
    return render_template('profile.html', utente=utente)

@app.route("/register" ,methods=["GET", "POST"])
def register() -> str:
    if request.method == "GET":
        return render_template("register.html")
        
    elif request.method == "POST":
        tesseraData: TesseraModel = getReqParams(**tesseraData)
        userData: UserModel = getReqParams(**userData)
        
        if not isEmpty(list(tesseraData.values())):
            #error 
            ...
        if not isEmpty(list(userData.values())):
            #error
            ...  

        tesseraData["password"] = generate_password_hash(tesseraData["password"])

        if not db.tessere.insert(**tesseraData):
            #error
            ...
        
        
        if not db.utenti.insert(**userData):
            #error
            ...
        

    
@app.route("/login", methods=["GET", "POST"])
def login() -> str:
    return render_template("login.html")
    

app.run(debug=True)
