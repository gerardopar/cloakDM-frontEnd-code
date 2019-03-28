// importing modules
import React from 'react';

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

export default DiscoverSearchBar;