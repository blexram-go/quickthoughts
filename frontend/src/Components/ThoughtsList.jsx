function ThoughtsList() {
    

    const thoughts = [
        {title: "title1", body: "This is the body for title1"},
        {title: "title2", body: "This is the body for title2"},
        {title: "title3", body: "This is the body for title3"},
    ];

    return (
        <div className="thoughts-container">
            <ul>
                {thoughts.map(entry => {
                    return (
                        <li key={entry.title}>
                            <h2>{entry.title}</h2>
                            <p>{entry.body}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}

export default ThoughtsList;