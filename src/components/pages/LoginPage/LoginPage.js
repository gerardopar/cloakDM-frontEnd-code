// importing modules 
import React from 'react';
import { NavLink } from 'react-router-dom';
// importing components
import Header from '../../header/Header';

const LoginPage = (props) =>  (
    <div>
        <Header />
        <div className="login">
            <h1 className="login__title">
                <NavLink to="/" exact={true} activeClassName="form--active">SIGN IN </NavLink> 
                | <NavLink to="/signup" exact={true} className="login__title" activeClassName="form--active"> SIGN UP</NavLink>
            </h1>
            <p className="login__text">Sign In and Start messaging connections!</p>
            <form onSubmit={props.handleLogin} className="login__form">
                <input name="email" className="login__form--email" type="email" placeholder="email" autoComplete="off" required/>
                <input name="password" className="login__form--password" type="password" placeholder="password" autoComplete="off" required/>
                <button className="login__form--btn waves-effect waves-light">SIGN IN</button>
            </form>
            <NavLink to="/reset" exact={true} className="login__forgotPassword--link">Forgot Your Password?</NavLink>
        </div>
    </div>
)

export default LoginPage;