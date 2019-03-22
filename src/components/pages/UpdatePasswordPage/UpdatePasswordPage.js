// importing modules
import React, { Component } from 'react';
// importing components
import Header from '../../header/Header';

class UpdatePasswordPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: null
        }

        this.token = this.props.match.params.token;
        this.handleUserToken = this.handleUserToken.bind(this);
        this.handlePasswordReset = this.handlePasswordReset.bind(this);
    };

    componentWillMount(){
        this.handleUserToken();
    }

    handleUserToken(){
        const token = this.token;
        fetch('http://localhost:3000/postResetToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.setState({ userId: usersData.userId });
        })
        .catch((err) => {
            console.log(err);
        });
    };

    handlePasswordReset(e){
        e.preventDefault();
        const token = this.token;
        const userId = this.state.userId;
        const password = e.target.elements.password.value;

        fetch('http://localhost:3000/postNewPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                userId: userId,
                password: password
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.props.history.push('/');
        })
        .catch((err) => {
            console.log(err);
        });
    };

    render(){
        return(
            <div>
                <Header />
                <div className="reset">
                    <form onSubmit={this.handlePasswordReset} className="reset__form">
                        <input className="reset__form--input" type="password" placeholder="new password" name="password"/>
                        <button type="submit" className="reset__form--btn">UPDATE PASSWORD</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UpdatePasswordPage;