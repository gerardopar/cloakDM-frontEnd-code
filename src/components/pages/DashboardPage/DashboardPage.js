// importing modules
import React, { Component } from 'react';

//importing components
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import SideBar from '../../sidebar/Sidebar';
import DashboardContent from './DashboardContent';

class DashboardPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            friendsListLength: null,
            conversationsListLength: null
        }
    }

    componentDidMount(){
        this.handleCurrentUser();
    }

    handleCurrentUser(){
        fetch('http://localhost:3000/getCurrentUser', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            this.setState({ 
                    user: {...usersData.user}, 
                    friendsListLength: usersData.friendsListLength,
                    conversationsListLength: usersData.conversationsListLength
                });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return (
            <div>
                <Header />
                <Layout>
                    <SideBar user={this.state.user}/>
                    <DashboardContent 
                        user={this.state.user}
                        friendsListLength={this.state.friendsListLength}
                        conversationsListLength={this.state.conversationsListLength}
                        />
                </Layout>
            </div>
        );
    };
}

export default DashboardPage;