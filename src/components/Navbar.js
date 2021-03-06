import React from 'react';
import apiClient from '../services/api';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as  NavLink } from 'react-router-dom';

const Navbar = (

    {
   
        authLink,
        loggedIn,
        NavLink: NavLink,
        ...rest
    }

) => {




    return ( 
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary p-3">
        <NavLink as={NavLink} to='/' className="navbar-brand"><i className="fa fa-cog fa-spin"></i> React Flix</NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
            <li className="nav-item text-light">
                <NavLink as={NavLink} to='/home' className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item text-light">
                <NavLink as={NavLink} to='/movies' className="nav-link">Movies</NavLink>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                {authLink}
            </li>
        </ul>
        </div>
        </nav>
    );
}
export default Navbar
