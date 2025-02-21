

const Libro = ({titolo, data, isbn, nomeAutore, cognomeAutore}) => {
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
                
            </ul>
        </div>
    </>)
}

export default Libro