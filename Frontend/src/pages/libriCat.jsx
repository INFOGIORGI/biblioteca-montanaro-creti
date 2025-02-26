import Libro from "../components/libro";
import axios from "axios";
import { useEffect, useState } from "react";

const opzioni = ["alfabetico per titolo", "alfabetico per autore", "Genere"];

const LibriCat = () => {
    const [ordinamento, setOrdinamento] = useState("");
    const [libri, setLibri] = useState([]); // Libri finali da mostrare
    const [libriRaw, setLibriRaw] = useState([]); // Libri originali non filtrati
    const [generi, setGeneri] = useState([]);
    const [ordGenere, setOrdGenere] = useState("");

    const sorting = (e) => {
        let value = e.target.value;
        setOrdinamento(value); 
    };

    const filterForGenere = (genere) => {
        return libriRaw.filter((libro) => libro.genere === genere);
    };

    const handleOrdGenere = (e) => {
        const value = e.target.value;
        setOrdGenere(value);
        console.log("ordinamento di genere selezionato: " + value);
    };

    const prendiGeneri = async () => {
        try {
            const response = await axios.get("api/getGeneri");
            setGeneri(response.data);
            console.log(response);
        } catch (errore) {
            console.error("Errore nel recupero dei Generi:", errore);
        }
    };

    const prendiLibri = async () => {
        try {
            const response = await axios.get("api/Libri");
            setLibriRaw(response.data); // Salviamo i libri originali
        } catch (errore) {
            console.error("Errore nel recupero dei libri:", errore);
        }
    };

    useEffect(() => {
        prendiLibri();
        prendiGeneri();

        const timer = setInterval(prendiLibri, 10000);
        return () => clearInterval(timer);
    }, []); // Effetto per caricare inizialmente i libri

    useEffect(() => {
        let filteredBooks = [...libriRaw]; 

        if (ordinamento === "Genere" && ordGenere) {
            filteredBooks = filterForGenere(ordGenere);
        }

        if (ordinamento === "alfabetico per titolo") {
            filteredBooks = filteredBooks.sort((a, b) => a.titolo.localeCompare(b.titolo));
        } else if (ordinamento === "alfabetico per autore") {
            filteredBooks = filteredBooks.sort((a, b) => a.nomeAutore.localeCompare(b.nomeAutore));
        }

        setLibri(filteredBooks);

    }, [ordinamento, ordGenere, libriRaw]); // qui ci metto le variabili che triggerano l'useeffect

    return (
        <>
            <form action="" className="mt-5 flex items-center space-x-3">
                <div>
                    <label className="ml-10 p-2 rounded-md" htmlFor="ord">Scegli un ordinamento:</label>
                    <select name="ord" className="p-2 border border-gray-400 rounded-md" onChange={sorting}>
                        {opzioni.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                {ordinamento === "Genere" && (
                    <div>
                        <label className="p-2 rounded-md" htmlFor="generi">Seleziona i generi:</label>
                        <select name="generi" className="p-2 border border-gray-400 rounded-md" onChange={handleOrdGenere}>
                            {generi.map((value, index) => (
                                <option key={index} value={value.genere}>{value.genere}</option>
                            ))}
                        </select>
                    </div>
                )}
            </form>

            {libri.length === 0 ? (
                <p className="text-center text-gray-500 text-2xl mt-5">
                    Nessun Libro disponibile :(
                </p>
            ) : (
                <div className="grid mx-10 mt-5 grid-cols-4 gap-3">
                    {libri.map((value) => {
                        const dataFormattata = value.dataPub
                            ? new Date(value.dataPub).toISOString().split("T")[0]
                            : "Data non disponibile";

                        return (
                            <div key={value.id} className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                <Libro
                                    titolo={value.titolo}
                                    isbn={value.ISBN}
                                    data={dataFormattata}
                                    nomeAutore={value.nomeAutore}
                                    cognomeAutore={value.cognomeAutore}
                                    genere={value.genere}
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
