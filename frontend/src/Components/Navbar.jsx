import { Link } from "react-router";

function Navbar()  {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1>QuickThoughts</h1>
            </div>
            <div className="navbar-center">
                <Link to="/">Home</Link>
                <Link to="/thoughts">Thoughts</Link>
                <Link to="/create">Create Thought</Link>
            </div>
            <div className="navbar-right">
                <button className="logout-button">Log Out</button>
            </div>
        </nav>
    )
}

export default Navbar;