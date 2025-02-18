from flask import Flask, render_template, url_for, request, flash, redirect
from _libs.db import Database
from _libs.models import *
from _libs.utils import *

app = Flask(__name__)
with app.app_context():  
    db = Database(app)



@app.route("/")
def hello() -> str:
    return render_template("index.html", message='Ciao mondo!!')

@app.route("/addLibro", methods = ["GET", "POST"])
def addLibro():
    return render_template("libri.html")

@app.route("/users")
def user() -> str:
    return render_template('users.html')

@app.route("/user/<utente>") 
def utente(utente) -> str:
    return render_template('profile.html', utente=utente)

"""@app.route("/register" ,methods=["GET", "POST"])
def register() -> str:
    return render_template("register.html")"""

    
"""@app.route("/login", methods=["GET", "POST"])
def register() -> str:
    return render_template("login.html")"""

app.run(debug=True)
