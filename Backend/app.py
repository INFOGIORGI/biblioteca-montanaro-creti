from flask import Flask, render_template, url_for, request, flash, redirect
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

@app.route("/addLibro/", methods = ["GET", "POST"])
def addLibro():
    if request.method == "GET":
        return render_template('libri.html')
    else:  
        ...
        



app.run(debug=True)
