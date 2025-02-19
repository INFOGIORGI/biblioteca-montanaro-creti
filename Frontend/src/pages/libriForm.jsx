import React, { useState } from 'react'
import axios from 'axios';

const LibriForm = () => {

    const [state, setState] = useState({
        isbn: '',
        titolo: '',
        anno: '',
        autore: '',
        genere: ''
    })

    const handleTextInput = (e) => {
        const [name, value] = [e.target.name, e.target.value];

        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/addLibro", {
                ...state
            });

            console.log("libro aggiunto con successo: ", response.data);
            alert("libro aggiunto");

        } catch (error) {
            console.log("errore con l'aggiunta del libro", error);
            alert("errore col libro");
        }


    }

    return (<>
        <div>
            <h1 className='text-4xl text-center mt-15 '>
                Aggiungi Libro
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-15  max-w-md mx-auto border ' >
                <label className='border pb-2 text-center '>Isbn:</label>
                <input type="text" className='font-bold w-auto h-auto p-3 bg-gray-200 border'name="isbn" placeholder='isbn' value={state.isbn} onChange={handleTextInput} />

                <label className='border pb-2 text-center '>Titolo:</label>
                <input className='font-bold w-auto h-auto p-3 bg-gray-200 border'   name="titolo" type="text" placeholder='titolo' value={state.titolo} onChange={handleTextInput} />

                <label className='border pb-2 text-center '>Anno:</label>
                <input type="date" className='font-bold w-auto h-auto p-3 bg-gray-200 border' placeholder='Anno' name="anno"value={state.anno} onChange={handleTextInput} />

                <label className='border pb-2 text-center '>Autore:</label>
                <input type="text"className='font-bold w-auto h-auto p-3 bg-gray-200 border' placeholder='Autore' name="autore" value={state.autore} onChange={handleTextInput} />

                <label className='border pb-2 text-center '>Genere:</label>
                <input type="text" className='font-bold w-auto h-auto p-3 bg-gray-200 border' placeholder='Genere' name="genere" value={state.genere} onChange={handleTextInput} />

                <button className='border pb-6 bg-gray-500 py-4 hover:bg-green-500' type="submit">Aggiungi Libro</button>

            </form>
        </div>

    </>

    )

}

export default LibriForm