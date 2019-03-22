import React from 'react';
import ConversationItem from './ConversationItem';
import moment from 'moment';

const ConversationContent = (props) => {
    props.conversations.forEach((conversation) => {
        if(moment(conversation.expirationDate).format("MMM Do YY, h:mm:ss a") < moment(Date.now()).format("MMM Do YY, h:mm:ss a") ){
            props.handleRemoveConversation(conversation._id);
            console.log('conversation has expired!');
        }
        console.log(conversation);
    });

    return (
    <div className="layout__content">
        <div className="conversation">
            <div className="conversation__list--container">
                { props.conversations.length !== 0 ?
                    props.conversations.map((conversation, index) => (
                        <ConversationItem 
                            key={index}
                            user={props.user}
                            {...conversation}
                            handleRemoveConversation={props.handleRemoveConversation}
                            />
                    )) : <div className="conversation__msg--wrap"><h4 className="conversation__msg--text">No conversations available</h4></div>
                }
            </div>
        </div>
    </div>
    )
};

export default ConversationContent;