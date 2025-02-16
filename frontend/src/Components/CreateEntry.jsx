import { useState } from 'react';

function CreateEntry() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');



    return (
        <div className="form-container">
            <form>
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