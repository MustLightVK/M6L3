import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';


const NavBar = () => {
    return (
        <nav className="nav">
        <ul className="nav-list">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/about">About</Link></li>
        </ul>
        </nav>
    );
};

export default NavBar;
