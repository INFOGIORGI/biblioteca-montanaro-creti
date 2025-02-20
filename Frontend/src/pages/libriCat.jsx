

import Libro from "../components/libro"
import axios from "axios"
import { useEffect, useState } from "react"



const LibriCat = () => {
    const [libri, setLibri] = useState([])

    const prendiLibri = () => {
        axios.get("api/Libri")
        .then((response) => {
            setLibri(response.data)
            console.log(response)
        })

        .catch((errore) => {
            console.log(errore)
        })
    }

    useEffect(() => {
        prendiLibri()

        const timer = setInterval(prendiLibri, 10000);
        return () => clearInterval(timer)
    }, [])

    return (<>

            {libri.length === 0 ?(
                <p className="text-center text-gray-500 text-2xl mt-5">Nessun Libro disponibile :(</p>
            ) : (<div className="grid mx-10 mt-5 grid-cols-3 gap-4">

            
            
                {libri.map((value) => (
                <div key={value.id} className="p-4 border rounded-lg shadow">
                    <Libro titolo={value.titolo} isbn={value.ISBN} data={value.dataPub} />
                </div>
                ))}
            </div>
        )}
       
    </>)
}


export default LibriCat;

