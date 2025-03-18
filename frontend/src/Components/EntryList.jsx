import { useState, useEffect } from "react";

function EntryList() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/entries");
                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();
                setEntries(data);
            } catch (error) {
                setError(`Failed to delete entry: ${error}.`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/entries/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete entry.");

            setEntries(entries.filter(entry => entry.id !== id));
        } catch (error) {
            setError(`Failed to delete entry: ${error}.`);
        }
    };

    if (loading) return <p>Loading entries...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="entry-list-container">
            {entries.length === 0 ? (
                <p>No entries available. Add a new thought!</p>
            ) : (
                entries.map(entry => (
                    <div className="entry-container" key={entry.id}>
                        <h2>{entry.title}</h2>
                        <p>{entry.body}</p>
                        <button className="btn btn-danger" onClick={() => handleDelete(entry.id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default EntryList;
