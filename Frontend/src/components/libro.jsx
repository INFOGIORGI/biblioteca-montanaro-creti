

const Libro = ({titolo, data, isbn, nomeAutore, cognomeAutore, genere}) => {
    return (<>
        <div>
            <ul className="">
                <li>
                    {titolo}
                </li>
                <li>
                    {data}
                </li>
                <li>
                    {isbn}
                </li>
                <li>
                    {nomeAutore + " " + cognomeAutore} 
                </li>
                <li>
                    {genere}
                </li>
                
            </ul>
        </div>
    </>)
}

export default Libro