import Libro from "../components/libro";
import axios from "axios";
import { useEffect, useState } from "react";

const opzioni = ["alfabetico per titolo", "alfabetico per autore", "Genere"]

const LibriCat = () => {
    const [ordinamento, setOrdinamento] = useState("")
    const [libri, setLibri] = useState([]);
    const [generi, setGeneri] = useState([])

    const handleChange = (e) => {
        const value = e.target.value
        setOrdinamento(value)
        console.log("ordinamento selezionato: " + value)
    }

    const prendiGeneri = async () => {
        try {
            const response = await axios.get("api/getGeneri");
            setGeneri(response.data);
            console.log(response);
        } catch (errore) {
            console.error("Errore nel recupero dei Generi:", errore);
        }
    }

    const prendiLibri = async () => {
        try {
            const response = await axios.get("api/Libri");
            setLibri(response.data);
            console.log(response);
        } catch (errore) {
            console.error("Errore nel recupero dei libri:", errore);
        }
    };

    useEffect(() => {
        prendiLibri();
        prendiGeneri();
        const timer = setInterval(prendiLibri, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <form action="" className="mt-5" >
                <label className="ml-10  border border-black-500 p-2 rounded-md "htmlFor="ord">scegli un ordinamento</label>
                <select name="ord" id="" onChange={handleChange}>
                
                {opzioni.map((value,index) => {
                    return <option className="ml-3 border" key={index} value={value}>{value}</option>
                    
                })}

                </select>
            </form>
            
            {libri.length === 0 ? (
                <p className="text-center text-gray-500 text-2xl mt-5">
                    Nessun Libro disponibile :(
                </p>
            ) : (
                <div className="grid mx-10 mt-5 grid-cols-3 gap-6">
                    {libri.map((value) => {
                        // Formattiamo la data per rimuovere l'orario
                        const dataFormattata = value.dataPub 
                            ? new Date(value.dataPub).toISOString().split("T")[0] 
                            : "Data non disponibile";

                        return (
                            <div key={value.id} className="p-4 border rounded-lg shadow transform hover:scale-105 transition-transform duration-300">
                                <Libro
                                    titolo={value.titolo}
                                    isbn={value.ISBN}
                                    data={dataFormattata} // Passiamo la data formattata
                                    nomeAutore={value.nomeAutore}
                                    cognomeAutore={value.cognomeAutore}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default LibriCat;
