// importing modules
import React, { Component } from 'react';

//importing components
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import SideBar from '../../sidebar/Sidebar';
import ConversationContent from './ConversationContent';

class ConversationPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            conversations: [],
            user: {}
        }

        this.handleConversations = this.handleConversations.bind(this);
        this.handleCurrentUser = this.handleCurrentUser.bind(this);
        this.handleRemoveConversation = this.handleRemoveConversation.bind(this);
    }

    componentWillMount(){
        this.handleConversations();
        this.handleCurrentUser();
    }

    handleConversations(){
        fetch('http://localhost:3000/getConversations', {
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
            this.setState({ conversations: [...usersData.conversations] });
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

    handleRemoveConversation(id){
        const conversationId = id;
        console.log(conversationId);
        
        fetch(`http://localhost:3000/removeConversation`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: conversationId
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            this.setState({ conversations: [...usersData.conversations] });
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
                    <ConversationContent 
                        handleRemoveConversation={this.handleRemoveConversation}
                        user={this.state.user}
                        conversations={this.state.conversations}/>
                </Layout>
            </div>
        );
    };
}

export default ConversationPage;