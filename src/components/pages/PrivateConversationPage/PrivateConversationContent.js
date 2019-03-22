import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PrivateConversationItem from './PrivateConversationItem';

class PrivateConversationContent extends Component {
    constructor(props){
        super(props);

    }

    // actives autoscroll on new messages
    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }

    render(){
        return (
        <div className="privateConversation">
                {
                    this.props.messages.map((PrivateConversation, index) => (
                        <PrivateConversationItem 
                            key={index}
                            users={this.props.users}
                            handleDeleteMessage={this.props.handleDeleteMessage}
                            userId={this.props.user._id}
                            {...PrivateConversation}/>
                    ))
                }
        </div>
        )
    }
}

export default PrivateConversationContent;
