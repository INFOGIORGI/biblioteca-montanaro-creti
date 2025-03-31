import { useEffect, useState } from "react";
import axios from "axios";
import Prestito from "../components/Prestito";
const Prestiti = () => {

    const [prestiti, setPrestiti] = useState([])

    const getPrestiti = async () => {
        const response = await axios.get("api/getPrestiti");
        console.log(response.data);
        setPrestiti(response.data)

    }

    useEffect(() => {
        getPrestiti()
    }, [])

    return (
        <div className="container mx-auto px-4 py-6">
            {prestiti && prestiti.length > 0  ? ( // Controlla se 'catalogo' ha elementi
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {prestiti.map((value) => {
                        const _dataInizio= value.dataInizio
                        ? new Date(value.dataInizio).toISOString().split("T")[0]
                        : "Data non disponibile";

                        const _dataFine= value.dataFine
                        ? new Date(value.dataFine).toISOString().split("T")[0]
                        : "Data non disponibile";
                        return (
                            <div
                                key={value.id}
                                className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <Prestito
                                    id={value.id}
                                    idLibro={value.idLibro}
                                    idTessera={value.idTessera}
                                    dataInizio={_dataInizio}
                                    dataFine={_dataFine}
                                    restituito={value.restituito}
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

export default Prestiti