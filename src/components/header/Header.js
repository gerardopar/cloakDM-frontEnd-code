// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <div>
        <header className="header z-depth-5">
            <NavLink to="/" exact={true} className="header__title">CLOAK<span className="header__title--span">DM</span></NavLink>
        </header>
    </div>
);

export default Header;