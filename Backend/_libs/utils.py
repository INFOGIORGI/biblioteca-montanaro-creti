from flask import request
"""

File in cui ci sono tutte le funzioni che appaiono in app.py per evitare inizializzazioni e 
definizioni confusionarie 

"""
def getReqParams(*id: str) -> dict[str: str]:
    retVal = {}
    for param in id: 
        retVal[param] = request.form.get(param, "")
    
    return retVal

def isEmpty(items: list) -> bool:
    if all(items):
        return True

    return False