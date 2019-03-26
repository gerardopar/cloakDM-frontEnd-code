// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
// importing images
import cloak_icon from '../../assets/img/cloak.svg';

const Header = () => (
    <div>
        <header className="header z-depth-5">
            <img className="header__icon" src={cloak_icon} alt="cloak icon" />
            <NavLink to="/" exact={true} className="header__title">CLOAK<span className="header__title--span">DM</span></NavLink>
        </header>
    </div>
);

export default Header;