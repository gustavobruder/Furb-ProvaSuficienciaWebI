import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <React.Fragment>
            <input type="checkbox" id="bt_menu"/>
            <label htmlFor="bt_menu">&#9776;</label>

            <nav className="menu">
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/list">List</Link></li>
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default Header;