

const Libro = ({titolo, data, isbn}) => {
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
            </ul>
        </div>
    </>)
}

export default Libro