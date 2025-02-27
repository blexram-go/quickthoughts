import { useState } from 'react';

function CreateEntry() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const entry = { title, body };

        try {
            const response = await fetch("http://localhost:8080/entries", {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(entry)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }

            const responseData = await response.json();
            console.log("Success:", responseData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label><br/>
                <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)}/><br/>
                <label htmlFor='body'>Your Thoughts:</label><br/>
                <textarea id='body' value={body} onChange={(e) => setBody(e.target.value)} /><br/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateEntry;