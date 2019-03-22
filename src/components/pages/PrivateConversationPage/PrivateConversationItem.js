// importing modules
import React from 'react';
import moment from 'moment';

const PrivateConversationItem = (props) => {
    return (
    <React.Fragment>
    {
        props.authorId === props.userId ? 
        <li className="privateConversation__msg--item--currentUser">
            <div>
                <i onClick={() => props.handleDeleteMessage(props._id)} className="far fa-trash-alt privateConversation--icon"></i>
            </div>
            <div className="privateConversation__text--wrap">
                <img className="privateConversation__msg--userImg" src={props.userImg !== 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' ? 'http://localhost:3000/' + props.userImg : 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'} alt="user img"/>
                <p className="privateConversation__msg--username--currentUser">{props.username}</p>
                <p className="privateConversation__msg--text--currentUser">{props.text}</p>
                <p>{moment(props.createdAt).format('MMM Do YY, h:mm:ss a')}</p>
            </div>
        </li> : props.authorId !== props.userId ? 
        <li className="privateConversation__msg--item">
            <div className="privateConversation__text--wrap">
                <img className="privateConversation__msg--userImg" src={props.userImg !== 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' ? 'http://localhost:3000/' + props.userImg : 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'} alt="user img"/>
                <p className="privateConversation__msg--username">{props.username}</p>
                <p className="privateConversation__msg--text">{props.text}</p>
                <p>{moment(props.createdAt).format('MMM Do YY, h:mm:ss a')}</p>
            </div>
            <div>
                <i onClick={() => props.handleDeleteMessage(props._id)} className="far fa-trash-alt privateConversation--icon"></i>
            </div>
        </li> : null
    }
    {
        props.messageImg !== null ? 
        <div className="privateConversation__text--wrap">
            <img src={'http://localhost:3000/' + props.messageImg} />
        </div> : null
    }
    </React.Fragment>)
};

export default PrivateConversationItem;