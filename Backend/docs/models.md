# Docs for the models

i modelli nascono da una necessita di snellire e rendere visivamente piú capibile il codice in app.py

## 

# Funzionamento

Abbiamo un file `models.py` in cui vanno i modelli che successivamente in fase di runtime verranno convertiti in dict

per la nomenclatura dei modelli oltre il camelCase non ci sono particolari costrizioni, al contrario per gli attributi devono avere lo stesso nome della colonna della tabella.

esempio se avessimo una tabella users(**username**, mail, password):

```
    userModel(TypedDict):
        username: str
        mail: str
        password: str
```

al momento dell'insert invece di richiamare un metodo con tanti argomenti avremo: 
```
    user = userModel(
        username = "Chriyl", 
        mail="miamail@mail.com ", 
        password="123"
        )

    db.users.insert(**user) # inserisce user nel db

```
