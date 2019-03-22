// importing modules
import React from 'react';

// importing components
import DiscoverItem from './DiscoverItems';
import Spinner from '../../spinner/Spinner';

const DiscoverContent = (props) => (
    <div className="layout__content">
        <div className="discover">
            <DiscoverSearchBar 
                handleDiscoverUser={props.handleDiscoverUser}/>
            {
                props.users.length !== 0 ? props.users.map((users, index) => (
                    <DiscoverItem
                        handleFriendRequest={props.handleFriendRequest}
                        {...users}
                        key={index}
                        />
                )) : <div className="discover__msg--wrap"><h4 className="discover__msg--text">Search users to discover new connections</h4></div>
            }
        </div>
        
    </div>
)

export default DiscoverContent;

const DiscoverSearchBar = (props) => (
    <form className="discover__form">
        <input 
            className="discover__form--input"
            type="text" 
            onChange={props.handleDiscoverUser}
            placeholder="discover users"
            />
        <button className="discover__form--btn">
            <i className="transparent waves-effect waves-light fas fa-search discover__form--btn--icon"></i>
        </button>
    </form>
);