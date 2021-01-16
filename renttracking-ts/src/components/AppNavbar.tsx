import React from 'react';
import homeImage from '../images/home.png';
const AppNavbar = () => {
    return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"> <img src={homeImage} alt="" width="30" height="30"/> </a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/viewtenant">View Tenant</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/about">About</a>
                            </li>                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AppNavbar;
