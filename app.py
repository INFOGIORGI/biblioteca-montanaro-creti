from flask import Flask, render_template, url_for, request, flash, redirect
from _libs.db import Database
from _libs.models import *
from _libs.utils import *

app = Flask(__name__)
with app.app_context():  
    db = Database(app)



@app.route("/")
def hello():
    return render_template("index.html", message='Ciao mondo!!')

@app.route("/addLibro/", methods = ["GET", "POST"])
def addLibro():
    if request.method == "GET":
        return render_template('libri.html')
    else:
        

@app.route("/users")
def user():
    return render_template('users.html', users=users)

@app.route("/user/<utente>")
def utente(utente):
    return render_template('profile.html', utente=utente)


app.run(debug=True)
