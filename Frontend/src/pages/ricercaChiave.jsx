import React, { useState } from 'react'
import axios from 'axios';

const RicercaChiave = () =>{

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

    return(
        <>
            <div>
                <h1 className='text-4xl text-center mt-15 '>
                    Ricerca per Chiave
                </h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-15  max-w-md mx-auto border '>
                    <label className='border pb-2 text-center '>Bus:</label>
                </form>
            </div>
            
        </>
    )
}

export default RicercaChiave