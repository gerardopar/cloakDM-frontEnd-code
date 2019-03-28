// importing modules
import React, { Component } from 'react';
// importing components
import Header from '../../header/Header';

class ResetPage extends Component {
    constructor(props){
        super(props);

        this.handlePasswordReset = this.handlePasswordReset.bind(this);
    };
    // todo: finish password reset method
    handlePasswordReset(e){
        e.preventDefault();
        const email = e.target.elements.email.value;
        fetch('https://cloakdm.herokuapp.com/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log('user data', usersData);
            this.props.history.push('/');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <Header />
                <div className="reset">
                    <form onSubmit={this.handlePasswordReset} className="reset__form">
                        <input className="reset__form--input" type="email" placeholder="email" name="email"/>
                        <button type="submit" className="reset__form--btn">RESET PASSWORD</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ResetPage;