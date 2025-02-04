function EntriesList() {
    const entries = [
        {"title": "title1", "body": "body for title1"},
        {"title": "title2", "body": "body for title2"},
        {"title": "title3", "body": "body for title3"}
    ];

    const entryItems = entries.map((entry) => (
        <li key={entry.title}>
            <h3>{entry.title}</h3><br/>
            <p>{entry.body}</p><br/>
        </li>
    ));

    return (
        <ul>{entryItems}</ul>
    )
}

export default EntriesList;