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
            <h1 className='text-4xl text-center mt-15 '>
                Aggiungi Libro
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-15  max-w-md mx-auto border ' >
                <label className='border pb-6'>Isbn:</label>
                <input type="text" className='font-bold'  placeholder='Isbn' value={isbn} onChange={handleIsbn}/>

                <label className='border pb-6'>Titolo:</label>
                <input className='font-bold'  type="text" placeholder='Titolo' value={titolo} onChange={handleTitolo}/>

                <label className='border pb-6'>Anno:</label>
                <input type="date" className='font-bold' placeholder='Anno' value={anno} onChange={handleAnno}/>

                <label className='border pb-6'>Autore:</label>
                <input type="text" className='font-bold'  placeholder='Autore' value={autore} onChange={handleAutore}/>

                <label className='border pb-6'>Genere:</label>
                <input type="text" className='font-bold' placeholder='Genere' value={genere} onChange={handleGenere}/>

                <button className='border pb-6 bg-gray-500 py-4' type="submit">Aggiungi Libro</button>

            </form>
        </div>
        
    </>
    
)

}

export default LibriForm