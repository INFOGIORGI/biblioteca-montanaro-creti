import React, { useState } from 'react'
import axios from 'axios';

const LibriForm = () => {
    const [isbn, setIsbn] = useState("");
    const [titolo, setTitolo] = useState("");
    const [anno, setAnno] = useState("");
    const [autore, setAutore] = useState("");
    const [genere, setGenere] = useState("");

    const handleIsbn = (e) => {
        setIsbn(e.target.value)
    }

    const handleTitolo = (e) => {
        setTitolo(e.target.value)
    }

    const handleAnno = (e) => {
        setAnno(e.target.value)
    }
    
    const handleAutore = (e) => {
        setAutore(e.target.value)
    }

    const handleGenere = (e) => {
        setGenere(e.target.value)
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("/addLibro", {
                Isbn: isbn,
                Titolo: titolo,
                Anno: anno,
                Autore: autore,
                Genere: genere
            })
    
            console.log("libro aggiunto con successo: " , response.data)
            alert("libro aggiunto")
            
        }catch (error){
            console.log("errore con l'aggiunta del libro", error)
            alert("errore col libro")
        }
       

    }

    return (<>
        <div>
            <form onSubmit={handleSubmit}>
                <label>Isbn:</label>
                <input type="text" placeholder='Isbn' value={isbn} onChange={handleIsbn}/>

                <label>Titolo:</label>
                <input type="text" placeholder='Titolo' value={titolo} onChange={handleTitolo}/>
                <label>Anno:</label>
                <input type="date" placeholder='Anno' value={anno} onChange={handleAnno}/>
                <label>Autore:</label>
                <input type="text" placeholder='Autore' value={autore} onChange={handleAutore}/>
                <label>Genere:</label>
                <input type="text" placeholder='Genere' value={genere} onChange={handleGenere}/>

                <button type="submit">Aggiungi Libro</button>

            </form>
        </div>
    </>
    
)

}

export default LibriForm