import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
    const [state, setState] = useState({
        name: '',
        surname: '',
        birthDate: '',
        deathDate: '',
        bio: ''
    });

    const [isAdmin, setIsAdmin] = useState(false);

    const handleTextInput = (e) => {
        const { name, value } = e.target;
        setState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita il refresh della pagina

        try {
            const response = await axios.post("/api/register", state);
            alert("Utente aggiunto!");
        } catch (error) {
            alert("Errore nell'inserimento dei dati");
            console.error(error);
        }
    };

    const verifyAdmin = async () => {
        try {
            const response = await axios.get("/api/getCookie");
            setIsAdmin(response); // Assumendo che il backend restituisca { isAdmin: true/false }
        } catch (error) {
            console.error("Errore nel recupero dello stato admin:", error);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        verifyAdmin();
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border">
            {!isAdmin ? (
                <p className="text-red-500 text-center">Non sei admin</p>
            ) : (
                <>
                    <h1 className="text-4xl text-center mb-6">Aggiungi un autore</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="text-center font-semibold">Nome:</label>
                        <input 
                            type="text" 
                            className="p-3 bg-gray-200 border" 
                            name="name" 
                            placeholder="Nome" 
                            value={state.name} 
                            onChange={handleTextInput} 
                            required
                        />

                        <label className="text-center font-semibold">Cognome:</label>
                        <input 
                            type="text" 
                            className="p-3 bg-gray-200 border" 
                            name="surname" 
                            placeholder="Cognome" 
                            value={state.surname} 
                            onChange={handleTextInput} 
                            required
                        />

                        <label className="text-center font-semibold">Data di nascita:</label>
                        <input 
                            type="date" 
                            className="p-3 bg-gray-200 border" 
                            name="birthDate" 
                            value={state.birthDate} 
                            onChange={handleTextInput} 
                            required
                        />

                        <label className="text-center font-semibold">Data di morte:</label>
                        <input 
                            type="date" 
                            className="p-3 bg-gray-200 border" 
                            name="deathDate" 
                            value={state.deathDate} 
                            onChange={handleTextInput} 
                        />

                        <label className="text-center font-semibold">Bio:</label>
                        <textarea 
                            className="p-3 bg-gray-200 border resize-none h-24" 
                            name="bio" 
                            placeholder="Biografia" 
                            value={state.bio} 
                            onChange={handleTextInput} 
                        />

                        <button className="bg-gray-500 text-white py-3 hover:bg-green-500 transition">
                            Aggiungi Autore
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Register;
