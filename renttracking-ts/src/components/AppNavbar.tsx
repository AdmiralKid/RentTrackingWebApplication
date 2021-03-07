import React from 'react';
import {Link} from 'react-router-dom';
import homeImage from '../images/home.png';
const AppNavbar = () => {
    return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"> <img src={homeImage} alt="" width="30" height="30"/> </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/tenant">Tenant</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/about">About</Link>
                            </li>                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AppNavbar;
