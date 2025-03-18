import { useState } from "react";

function CreateEntry() {
    const [formData, setFormData] = useState({ title: "", body: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:8080/entries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            setFormData({ title: "", body: "" });
            setMessage("Entry added successfully!");
        } catch (error) {
            setMessage(`Failed to add entry: ${error}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">Your Thoughts</label>
                    <textarea
                        id="body"
                        name="body"
                        className="form-control"
                        rows={3}
                        value={formData.body}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
            {message && 
                <>
                    <p className="mt-3">{message}</p>
                    <br />
                    <h2 className="mt-3">{formData.title}</h2>
                    <p className="mt-3">{formData.body}</p>
                </>
                }
        </div>
    );
}

export default CreateEntry;
