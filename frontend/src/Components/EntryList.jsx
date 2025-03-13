import { useState, useEffect } from 'react';

function EntryList() {

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/entries");
                if (!response.ok) {
                    throw new Error(`HTTP Error! status: ${response.status}`)
                }
                    const entries = await response.json();
                    setEntries(entries);
                    console.log(entries);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/entries/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Failed to delete entry with ID: ${id}`);
            }

            setEntries(entries.filter(entry => entry.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="entry-list-container">
                {entries.map(entry => {
                    return (
                        <div className="entry-container" key={entry.id}>
                            <h2>{entry.title}</h2>
                            <br/>
                            <p>{entry.body}</p>
                            <button className="entry-delete-button" onClick={() => handleDelete(entry.id)}>Delete</button>
                        </div>
                    );
                })}
        </div>
    )

}

export default EntryList;