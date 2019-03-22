import React from 'react';
import { Link } from 'react-router-dom'

const DiscoverItem = (props) => (
    <div className="discover__user--item z-depth-5">
        <Link className="discover__user--img--wrap" to={`/profile/${props._id}`}>
            <img className="discover__user--img" src={props.profileImg !== 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' ? 'http://localhost:3000/' + props.profileImg : 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'} alt="user image"/>
        </Link>
        <div className="discover__user--details--wrap">
            <p className="discover__user--details--name">{props.username}</p>
            {
                props.gender === 'male'     
                    ? <p className="discover__user--details--gender"><i className="fas fa-mars"></i> {props.gender}</p> 
                    ? props.gender === 'female' : <p className="discover__user--details--gender"><i className="fas fa-venus"></i> {props.gender}</p>
                    : null
            }
            <p className="discover__user--details--name">{props.age}</p>
        </div>
        <div className="discover__user--btn--wrap">
            <button onClick={() => (props.handleFriendRequest(props._id))} className="discover__user--btn waves-effect waves-light"><i className="fas fa-user-plus"></i><br /><span className="friends__user--btn--span">REQUEST</span></button>
        </div>
    </div>
);

export default DiscoverItem;