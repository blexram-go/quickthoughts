import { useState } from 'react';
import "./navbar.css"
import Home from './Home.jsx';
import EntriesList from '../EntriesList.jsx';
import CreateEntryForm from './CreateEntryForm.jsx';

function Navbar() {
    const [currentPage, setCurrentPage] = useState('home');

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="navbar">
                <nav>
                    <div className="navbar-left">
                        <h2>QuickThoughts</h2>
                    </div>
                    <div className="navbar-center">
                        <ul>
                            <li><a onClick={() => handlePageChange('home')}>Home</a></li>
                            <li><a onClick={() => handlePageChange('entries')}>Entries</a></li>
                            <li><a onClick={() => handlePageChange('create')}>New Entry</a></li>
                        </ul>
                    </div>
                    <div className="navbar-right">
                        <h3>Logout</h3>
                    </div>
                </nav>
            </div>
            <div className="page-content">
                {currentPage === "home" && <Home />}
                {currentPage === "entries" && <EntriesList />}
                {currentPage === "create" && <CreateEntryForm />}
            </div>
        </>
    );
}

export default Navbar;