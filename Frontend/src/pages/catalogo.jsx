import React, { useState, useEffect } from "react";
import axios from "axios";
import CatalogoSingle from "../components/catalogoSingle";

const Catalogo = () => {
    const [catalogo, setCatalogo] = useState([]);

    const prendiCatalogo = async () => {
        try {
            const response = await axios.get("api/Catalogo");
            setCatalogo(response.data); // Assicurati che la risposta sia un array
        } catch (error) {
            console.error("Errore durante il caricamento del catalogo:", error);
        }
    };

    useEffect(() => {
        prendiCatalogo(); // Chiamata API al montaggio del componente
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            {catalogo && catalogo.length > 0  ? ( // Controlla se 'catalogo' ha elementi
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {catalogo.map((value) => {
                        return (
                            <div
                                key={value.id}
                                className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <CatalogoSingle
                                    titolo={value.titolo}
                                    genere={value.genere}
                                    disponibile={value.disponibile}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>Loading...</div> // Messaggio di caricamento
            )}
        </div>
    );
}

export default Catalogo;
