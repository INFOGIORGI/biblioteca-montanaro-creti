import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
    const [state, setState] = useState({
        numTessera: "",
        name: '',
        surname: '',
        password: '',
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
            alert("Utente aggiunto!");
        } catch (error) {
            alert("Errore nell'inserimento dei dati");
            console.error(error);
        }
    };

    const verifyAdmin = async () => {
        try {
            const response = await axios.post("/api/verifyAdmin", {
                "session": getCookie()  // Include i cookie nella richiesta
            });
            console.log(response.data.admin);
            console.log(getCookie())
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
                    <h1 className="text-4xl text-center mb-6">Login</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <label className="text-center font-semibold">Numero della tessera:</label>
                        <input 
                            type="text" 
                            className="p-3 bg-gray-200 border" 
                            name="numTessera" 
                            placeholder="Nome" 
                            value={state.numTessera} 
                            onChange={handleTextInput} 
                            required
                        />
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

                     
                        
                        <label className="text-center font-semibold">email:</label>
                        <input 
                            type="text" 
                            className="p-3 bg-gray-200 border" 
                            name="email" 
                            placeholder="Nome" 
                            value={state.email} 
                            onChange={handleTextInput} 
                            required
                        />

                        <label className="text-center font-semibold">password:</label>
                        <input 
                            type="password" 
                            className="p-3 bg-gray-200 border" 
                            name="password" 
                            placeholder="Nome" 
                            value={state.password} 
                            onChange={handleTextInput} 
                            required
                        />

                        


                        
                        <button className="bg-gray-500 text-white py-3 hover:bg-green-500 transition">
                            Effettua Login
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Login;
