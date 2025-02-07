from flask import Flask, render_template, url_for

app = Flask(__name__)

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
    return render_template("register.html")

    
@app.route("/login", methods=["GET", "POST"])
def register() -> str:
    return render_template("login.html")

app.run(debug=True)
