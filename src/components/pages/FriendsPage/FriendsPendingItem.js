import React from 'react';
import { Link } from 'react-router-dom';

const FriendsPendingItem = (props) => (
    
        <div className="friends__user--item z-depth-5">
            <Link className="friends__user--img--wrap" to={`/profile/${props._id}`}>
                <img className="friends__user--img" src={props.profileImg !== 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' ? 'http://localhost:3000/' + props.profileImg : 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'} alt="user image"/>
            </Link>
            <div className="friends__user--details--wrap">
                <p className="friends__user--details--name">{props.username}</p>
                {
                    props.gender === 'male'     
                        ? <p className="friends__user--details--gender"><i className="fas fa-mars"></i> {props.gender}</p> 
                        ? props.gender === 'female' : <p className="friends__user--details--gender"><i className="fas fa-venus"></i> {props.gender}</p>
                        : null
                }
                <p className="friends__user--details--name">{props.age}</p>
            </div>
            <div className="friends__user--btn--wrap">
                <button onClick={() => props.handleCancelPendingRequest(props._id)} className="friends__user--btn waves-effect waves-light friends__user--btn--deny"><i className="fas fa-times"></i><br /><span className="friends__user--btn--span">CANCEL</span></button>
            </div>
        </div>
);

export default FriendsPendingItem;