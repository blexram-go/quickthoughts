import { useState, useEffect } from 'react';

function EntryList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/entries");
                if (!response.ok) {
                    throw new Error(`HTTP Error! status: ${response.status}`)
                }
                    const data = await response.json();
                    setData(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return (
        <div className="entry-list-container">
            <ul>
                {data.map(entry => {
                    return (
                        <>
                            <div className="entry-container">
                                <li key={entry.ID}>
                                    <h2>{entry.title}</h2>
                                    <br/>
                                    <p>{entry.body}</p>
                                </li>
                            </div>
                        </>
                    )
                })}
            </ul>
        </div>
    )

}

export default EntryList;