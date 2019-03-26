// importing modules
import React, { Component } from 'react';
import io from 'socket.io-client';
import { NavLink } from 'react-router-dom';

//importing components
import Layout from '../../layout/Layout';
import SideBar from '../../sidebar/Sidebar';
import PrivateConversationContent from './PrivateConversationContent';

class PrivateConversationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            users: [],
            user: {}
        }

        this.conversationID = this.props.match.params.id;
        this.updateMessages = this.updateMessages.bind(this);
        this.socket = io(`http://localhost:3000`);
        // this.socket = io(`http://localhost:3000/${this.conversationID}`);
        this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
        this.handleMessageWithImg = this.handleMessageWithImg.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleCurrentUser = this.handleCurrentUser.bind(this);
    }

    componentWillMount(){
        this.socket.emit('roomId', {roomId: this.conversationID});
    }

    componentDidMount(){
        this.handleMessages();
        this.handleCurrentUser();
        // ! testing non blocking socket.io
        this.socket.on('connect', () => {
            console.log(`private client connected ${this.conversationID}`);
        });
        this.socket.on('addMessage', (data) => {
            if(data.action === 'addMessage'){
                this.updateMessages([...data.conversation]);
            }
        });
        this.socket.on('addMessageImg', (data) => {
            if(data.action === 'addMessageImg'){
                this.updateMessages([...data.conversation]);
            }
        });
        this.socket.on('removeMessage', (data) => {
            if(data.action === 'removeMessage'){
                this.updateMessages([...data.conversation]);
            }
        });
        // ! testing non blocking socket.io
    }

    // !helper functions
    updateMessages(messages){
        this.setState({ messages: [...messages]});
    } 

    handleMessages(){
        const id = this.props.match.params.id;
        fetch(`http://localhost:3000/messages`, {
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
            this.setState({ messages: [...usersData.conversation] }); // * updates state via rest api
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleSendMessage(e){
        e.preventDefault();
        const message = e.target.elements.message.value;
        const id = this.conversationID;

        fetch(`http://localhost:3000/replyToMessage`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                message: message
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            document.getElementById("msg_form").reset(); // clears the input field onSubmit
            // ! adds message via socket.io
            // this.socket.on('chatMsgOutput', (data) => {
            //     this.setState({ messages: [...data.conversation.messages] });
            // });
            // ! adds message via socket.io
            // this.setState({ messages: [...usersData.conversation.messages] }); // * updates state via rest api
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleDeleteMessage(messageId){
        const id = this.props.match.params.id;
        fetch(`http://localhost:3000/removeMessage`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                messageId: messageId
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log(usersData);
            // ! removes message via socket.io
            // this.socket.on('updatedMsgOutput', (data) => {
            //     this.setState({ messages: [...data.conversation.messages] });
            // });
            // ! removes message via socket.io
            // this.setState({ messages: [...usersData.conversation.messages] });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleMessageWithImg(e){
        const id = this.props.match.params.id;
        e.preventDefault();

        const formData = new FormData();
        // formData.append('image', this.state.selectedFile);
        formData.append('image', e.target.files[0]);
        formData.append('id', id);

        fetch('http://localhost:3000/messageWithImg', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
            },
            body: formData
        })
        .then((data) => {
            return data.json();
        })
        .then((dataReturned) => {
            console.log(dataReturned);
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
                <div>
                    <header className="header z-depth-5">
                    <p></p>
                    <NavLink to="/" exact={true} className="header__title">CLOAK<span className="header__title--span">DM</span></NavLink>
                    </header>
                </div>
                <Layout>
                    <SideBar user={this.state.user}/>
                    <div className="privateConversation__content--layout">
                        <PrivateConversationContent 
                            user={this.state.user}
                            handleDeleteMessage={this.handleDeleteMessage}
                            handleSendMessage={this.handleSendMessage}
                            messages={this.state.messages}
                            users={this.state.users}/>
                    </div>
                    <div>
                    <div className="privateConversation__form--wrap">
                    <form onSubmit={this.handleSendMessage} className="privateConversation__form" id="msg_form">
                        <input type="text" autoComplete="off" name="message" className="privateConversation__input"/>
                        <button className="privateConversation__btn--submit">SEND</button>
                    </form>
                    <input type="file" onChange={this.handleMessageWithImg}/>
                    </div>
                    </div>
                </Layout>
            </div>
        );
    };
}

export default PrivateConversationPage;