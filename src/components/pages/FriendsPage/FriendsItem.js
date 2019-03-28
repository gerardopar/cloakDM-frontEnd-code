import React from 'react';
import { Link } from 'react-router-dom';

const FriendItem = (props) => (
    <div className="friends__user--item z-depth-5">
        <Link className="friends__user--img--wrap" to={`/profile/${props._id}`}>
        <img className="friends__user--img" src={props.profileImg !== 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' ? 'https://cloakdm.herokuapp.com/' + props.profileImg : 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'}/>
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
            <button onClick={() => props.handleCreateConvo(props._id)} className="friends__user--btn waves-effect waves-light friends__user--btn--msg"><i className="fas fa-comments"></i><br /><span className="friends__user--btn--span">MESSAGE</span></button>
            {/*<button className="friends__user--btn waves-effect waves-light friends__user--btn--block"><i className="fas fa-ban"></i><br /><span className="friends__user--btn--span">BLOCK</span></button>*/}
            <button onClick={() => props.handleRemoveFriend(props._id)} className="friends__user--btn waves-effect waves-light friends__user--btn--delete"><i className="fas fa-user-minus"></i><br /><span className="friends__user--btn--span">REMOVE</span></button>
        </div>
    </div>
);

export default FriendItem;