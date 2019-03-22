// importing modules
import React, { Component } from 'react';

//importing components
import Spinner from '../../spinner/Spinner';
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import SideBar from '../../sidebar/Sidebar';
import DiscoverContent from '../../pages/DiscoverPage/DiscoverContent';

class DiscoverPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
            friendsList: [],
            user: {},
            userName: null
        }
        // this.handleLoadUsers = this.handleLoadUsers.bind(this);
        this.handleFriendRequest = this.handleFriendRequest.bind(this);
        this.handleFriends = this.handleFriends.bind(this);
        this.handleDiscoverUser = this.handleDiscoverUser.bind(this);
    }

    componentDidMount(){
        // this.handleLoadUsers();
        this.handleCurrentUser();
        
    }

    handleFriends(){
        fetch('http://localhost:3000/getFriends', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log('friends list', usersData.users);
            this.setState({ friendsList: [...usersData.users] });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // handleLoadUsers(){
    //     fetch('http://localhost:3000/users', {
    //         method: 'GET',
    //         headers: {
    //             Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then((data) => {
    //         return data.json();
    //     })
    //     .then((usersData) => {
    //         console.log('discover users', usersData.users);
    //         this.setState({ users: [...usersData.users] });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    handleFriendRequest(id){
        fetch(`http://localhost:3000/sendFriendRequest`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
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
            this.setState({ user: {...usersData.user} });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleDiscoverUser(e){
        e.preventDefault();
        const userSearch = e.target.value;
        console.log(userSearch);

        fetch(`http://localhost:3000/discoverUsers`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userSearch
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.setState({ users: [...usersData.users] });
            
            // clear search input if the search bar is clear
            if(userSearch.length === 0 ){
                this.setState({ users: [] });
            }
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
                    <DiscoverContent 
                        handleDiscoverUser={this.handleDiscoverUser}
                        handleFriendRequest={this.handleFriendRequest}
                        users={this.state.users}/>
                </Layout>
            </div>
        );
    };
}

export default DiscoverPage;