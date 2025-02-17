from flask import Flask, render_template
from werkzeug.security import generate_password_hash
from _libs.db import Database
from pprint import pprint
from _libs.models import UserModel
from _libs.utils import *

app = Flask(__name__)
with app.app_context():  
    db = Database(app)



@app.route("/")
def hello():
    return render_template("index.html", message='Ciao mondo!!')

@app.route("/users")
def user():
    return render_template('users.html', users=users)

@app.route("/user/<utente>")
def utente(utente):
    return render_template('profile.html', utente=utente)


app.run(debug=True)
