import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {
    const [state, setState] = useState({
        name: '',
        surname: '',
        password: '',
        confirm_password: '',
        telefono: '',
        email: ''
    });

    const [isAdmin, setIsAdmin] = useState(false);

    const getCookie = () =>  {
        let cookie = document.cookie;
        console.log(cookie)
        cookie =  cookie.split("=",2);
        return cookie[1]

    }

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
            console.log(response.data)
            alert(`"Utente aggiunto! ${state.name} ${state.surname}"`);
        } catch (error) {
            alert("Errore nell'inserimento dei dati");
            console.log(response.data)
            console.error(error);
        }
    };

    const verifyAdmin = async () => {
        try {
            const response = await axios.post("/api/isAdmin", {}, {
                withCredentials: true // Include i cookie nella richiesta
            });
            console.log(response.data.isAdmin);
            
            //console.log("Cookie attuali:", document.cookie);
            setIsAdmin(true);  // Assicurati che `response.data.admin` contenga il valore corretto
        } catch (error) {
            console.error("Errore nel recupero dello stato admin:", error);
            setIsAdmin(true);
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
                    <h1 className="text-4xl text-center mb-6">Registra un utente</h1>
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

                        <label className="text-center font-semibold">Telefono:</label>
                        <input 
                            type="text" 
                            className="p-3 bg-gray-200 border" 
                            name="telefono" 
                            placeholder="Telefono" 
                            value={state.telefono} 
                            onChange={handleTextInput} 
                            required
                        />
                        
                        <label className="text-center font-semibold">Email:</label>
                        <input 
                            type="text" 
                            className="p-3 bg-gray-200 border" 
                            name="email" 
                            placeholder="Email" 
                            value={state.email} 
                            onChange={handleTextInput} 
                            required
                        />

                        <label className="text-center font-semibold">Password:</label>
                        <input 
                            type="password" 
                            className="p-3 bg-gray-200 border" 
                            name="password" 
                            placeholder="Password" 
                            value={state.password} 
                            onChange={handleTextInput} 
                            required
                        />

                        <label className="text-center font-semibold">Conferma password:</label>
                        <input 
                            type="password" 
                            className="p-3 bg-gray-200 border" 
                            name="confirm_password" 
                            placeholder="Conferma password" 
                            value={state.confirm_password} 
                            onChange={handleTextInput} 
                            required
                        />

                        
                        <button className="bg-gray-500 text-white py-3 hover:bg-green-500 transition">
                            Registra untente
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Register;
