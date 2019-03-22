import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../header/Header';

class SignupPage extends Component {
    constructor(props){
        super(props);

        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup(e){
        e.preventDefault();
        console.log(e.target.elements.username.value);
        fetch(`http://localhost:3000/signup`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.target.elements.username.value,
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error(
                "Validation failed. Make sure the email address isn't used yet!"
            );
            }
            if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Creating a user failed!');
            }
            return res.json();
        })
        .then(result => {
            console.log(result);
            this.props.history.push('/');
        })
        .catch((err) => console.log(err));
    }

    render(){
        return (
            <div>
                <Header />
                <div className="signup">
                    <h1 className="signup__title">
                        <NavLink to="/" exact={true} className="signup__title" activeClassName="form--active">SIGN IN </NavLink> 
                        | <NavLink to="/signup" exact={true} activeClassName="form--active"> SIGN UP</NavLink>
                    </h1>
                    <p className="signup__text">Sign Up and Start creating connections!</p>
                    <form onSubmit={this.handleSignup} className="signup__form">
                        <input name="username" className="signup__form--username" type="text" placeholder="username" required/>
                        <input name="email" className="signup__form--email" type="email" placeholder="email" required/>
                        <input name="password" className="signup__form--password" type="password" placeholder="password" required/>
                        <button className="signup__form--btn waves-effect waves-light">SIGN UP</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignupPage;