

const Prestito = ({id, idLibro, idTessera, dataInizio, dataFine, restituito}) => {
    return (<>
        <div>
            <ul className="">
                <li>
                    id prestito: {id}
                </li>
                <li>
                    id del libro: {idLibro}
                </li>
                <li>
                    id dell'utente: {idTessera}
                </li>
                <li>
                    data inizio del prestito: {dataInizio}
                </li>
                <li>
                    presunta data fine: {dataFine}
                </li>
                <li>
                {`${restituito ? 'restituito' : 'non restituito'}`}
                </li>
         
                
            </ul>
        </div>
    </>)
}

export default Prestito