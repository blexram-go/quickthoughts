import { Link } from "react-router-dom";

function Navbar()  {
    return (
        <nav className="navbar navbar-default container-md">
            <div className="navbar-brand">
                <h4>QuickThoughts</h4>
            </div>
            <div className="navbar-nav d-flex flex-row m-3">
                <Link to="/" className="nav-link m-3">Home</Link>
                <Link to="/entries" className="nav-link m-3">Thoughts</Link>
                <Link to="/create" className="nav-link m-3">Create Thought</Link>
            </div>
            <div className="navbar-nav navbar-right">
                <button className="btn btn-outline-danger">Log Out</button>
            </div>
        </nav>
    )
}

export default Navbar;