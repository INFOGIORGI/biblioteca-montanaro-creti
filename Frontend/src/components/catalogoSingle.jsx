

const CatalogoSingle = ({titolo, genere, disponibile}) => {
    return (<>
        <div>
            <ul className="">
                <li>
                    {titolo}
                </li>
                <li>
                    genere: {genere}
                </li>
                <li>
                {`${disponibile ? 'Disponibile' : 'Non disponibile'}`}
                </li>
         
                
            </ul>
        </div>
    </>)
}

export default CatalogoSingle