function CreateEntryForm() {
    return (
        <form action="" className="entry-form">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title"/>
            <label htmlFor="entryBody">Your QuickThought:</label>
            <input type="text" name="entryBody" id="entryBody"/>
            <button type="submit">Post QuickThought</button>
        </form>
    )
}

export default CreateEntryForm;