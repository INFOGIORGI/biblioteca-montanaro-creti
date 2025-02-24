import React, { useState } from 'react'
import axios from 'axios';

const FormAutori = () => {

    const [state, setState] = useState({
        nome: '',
        cognome: '',
        DataNascita: '',
        DataMorte: '',
        bio: ''
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
            const response = await axios.post("/api/addAutore", {
                ...state
            });

            console.log("libro aggiunto con successo: ", response.data);
            alert("autore aggiunto");

        } catch (error) {
            console.log("errore con l'aggiunta del libro", error);
            alert("errore con l'autore");
        }


    }

    return (<>
        <div>
            <h1 className='text-4xl text-center mt-15 '>
                Aggiungi un autore
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-15  max-w-md mx-auto border ' >
                <label className='border pb-2 text-center '>Nome:</label>
                <input  type="text" className='font-bold w-auto h-auto p-3 bg-gray-200 border'name="nome" placeholder='nome' value={state.nome} onChange={handleTextInput} />

                <label className='border pb-2 text-center '>Cognome:</label>
                <input className='font-bold w-auto h-auto p-3 bg-gray-200 border'   name="cognome" type="text" placeholder='cognome' value={state.cognome} onChange={handleTextInput} />

                <label className='border pb-2 text-center '>Data di nascita:</label>
                <input type="date" className='font-bold w-auto h-auto p-3 bg-gray-200 border' placeholder='DataNascita' name="DataNascita"value={state.DataNascita} onChange={handleTextInput} />

                <label className='border pb-2 text-center '>Data di morte:</label>
                <input type="date"className='font-bold w-auto h-auto p-3 bg-gray-200 border' placeholder='DataMorte' name="DataMorte" value={state.DataMorte} onChange={handleTextInput} />

                <label className='border pb-2 text-center '>Bio:</label>
                <input type="text" className='font-bold w-auto h-auto p-3 bg-gray-200 border' placeholder='Bio:' name="bio" value={state.bio} onChange={handleTextInput} />

                <button className='border pb-6 bg-gray-500 py-4 hover:bg-green-500' type="submit">Aggiungi Autore</button>

            </form>
        </div>

    </>

    )

}

export default FormAutori