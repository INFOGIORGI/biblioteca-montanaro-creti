import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RicercaChiave = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResult([]); // Se la query è vuota, svuota i risultati
      return;
    }

    const Debounce = setTimeout(() => {
      setLoading(true);
      axios
        .post("/api/ricercaChiave", { query: query })
        .then((response) => {
          setResult(response.data);
        })
        .catch((error) => {
          console.error("Errore nella ricerca:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500); // Impostiamo il debounce (delay tra un input e l'altro)

    return () => clearTimeout(Debounce); // Pulisce il timeout se l'utente digita ancora
  }, [query]);

  return (
    <>
      <div>
        <h1 className="text-4xl text-center mt-15">Ricerca per Chiave</h1>

        <form className="flex flex-col gap-2 mt-15 max-w-md mx-auto border">
          <label className="border pb-2 text-center">Bus:</label>
          <input
            type="text"
            className="font-bold w-auto h-auto p-1 bg-gray-200 border"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Fai la ricerca"
          />

          {loading && <p>Caricamento...</p>} {/* Indicatore di caricamento */}

          {result.length > 0 ? (
            result.map((book, index) => (
              <p className='border p-1 text-s' key={index}>{book.titolo} - {book.genere}</p> // Aggiungi un `key` per ogni elemento
            ))
          ) : (
            <p>Nessun risultato trovato</p> // Messaggio se non ci sono risultati
          )}
        </form>
      </div>
    </>
  );
};

export default RicercaChiave;
