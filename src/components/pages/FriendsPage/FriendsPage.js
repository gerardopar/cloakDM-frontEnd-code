// importing modules
import React, { Component } from 'react';
// import openSocket from 'socket.io-client';
//importing components
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import SideBar from '../../sidebar/Sidebar';
import FriendsContent from './FriendsContent';

class FriendsPage extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            friendRequests: [],
            pendingRequests: [],
            friendsList: [],
            user: {}
        }

        this.handleCreateConvo = this.handleCreateConvo.bind(this);
        this.handleFriendRequests = this.handleFriendRequests.bind(this);
        this.handlePendingRequests = this.handlePendingRequests.bind(this);
        this.handleCancelPendingRequest = this.handleCancelPendingRequest.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleRejectFriend = this.handleRejectFriend.bind(this);
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
        this.handleFriends = this.handleFriends.bind(this);
    }

    componentWillUpdate(){
        // this.handleFriendRequests();
        // this.handlePendingRequests();
        // this.handleFriends();
    }

    componentWillMount(){
        this.handleFriendRequests();
        this.handlePendingRequests();
        this.handleFriends();
        this.handleCurrentUser();
        // openSocket('http://localhost:3000');
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
            this.setState({ friendsList: [...usersData.users] });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleFriendRequests(){
        fetch('http://localhost:3000/getFriendRequests', {
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
            this.setState({ friendRequests: [...usersData.users] });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handlePendingRequests(){
        fetch('http://localhost:3000/getPendingRequests', {
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
            this.setState({ pendingRequests: [...usersData.users] });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleAddFriend(id){
        fetch(`http://localhost:3000/addFriend`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.setState(() => ({
                friendsList: [...usersData.friendsList],
                friendRequests: [...usersData.requestList]
            }));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleRejectFriend(id){
        fetch(`http://localhost:3000/rejectFriend`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.setState(() => ({
                friendRequests: [...usersData.requestList]
            }));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleRemoveFriend(id){
        fetch(`http://localhost:3000/removeFriend`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.setState(() => ({
                friendsList: [...usersData.friendsList]
            }));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleCancelPendingRequest(id){
        fetch(`http://localhost:3000/cancelPendingRequest`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.setState(() => ({
                pendingRequests: [...usersData.pendingRequests]
            }));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleCreateConvo(id){
        fetch(`http://localhost:3000/newConversation`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.props.history.push('/conversations');
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

    render(){
        return (
            <div>
                <Header />
                <Layout>
                    <SideBar user={this.state.user}/>
                    <FriendsContent 
                        handleAddFriend={this.handleAddFriend}
                        handleCancelPendingRequest={this.handleCancelPendingRequest}
                        handleRejectFriend={this.handleRejectFriend}
                        handleRemoveFriend={this.handleRemoveFriend}
                        handleCreateConvo={this.handleCreateConvo}
                        friendsList={this.state.friendsList}
                        friendRequests={this.state.friendRequests}
                        pendingRequests={this.state.pendingRequests}
                        />
                </Layout>
            </div>
        );
    };
}

export default FriendsPage;