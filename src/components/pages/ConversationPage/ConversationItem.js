import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ConversationItem = (props) => (
    <div className="conversation__id--container">
        
        {
            props.user._id === props.convoUsers[0]._id 
                ? <img className="friends__user--img" src={props.convoUsers[1].profileImg !== 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' ? 'http://localhost:3000/' + props.convoUsers[1].profileImg : 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'}/>
                : props.user._id === props.convoUsers[1]._id ? <img className="friends__user--img" src={props.convoUsers[1].profileImg !== 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' ? 'http://localhost:3000/' + props.convoUsers[0].profileImg : 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'}/>  : null
        }
        {
            props.user._id === props.convoUsers[0]._id 
                ? <p>{props.convoUsers[1].username}</p> 
                : props.user._id === props.convoUsers[1]._id ? <p>{props.convoUsers[0].username}</p>  : null
        }
        <p>Expires: {moment(props.expirationDate).format("MMM Do YY, h:mm:ss a")}</p>
        <i onClick={() => props.handleRemoveConversation(props._id)} className="far fa-trash-alt privateConversation--icon"></i>
        <Link to={`/conversation/${props._id}`} >
            <i className="fas fa-chevron-right conversation__link"></i>
        </Link>
    </div>
);

export default ConversationItem;