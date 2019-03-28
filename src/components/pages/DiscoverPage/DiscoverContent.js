// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';

// importing components
import DiscoverItem from './DiscoverItems';
import DiscoverSearchBar from './DiscoverSearchBar';

// importing react context
import RouteContext from '../../../context/routeContext';


const DiscoverContent = (props) => (
    <RouteContext.Consumer>
        {routeContext => {
        return (
            routeContext.isHidden ?
            <div className="layout__content--expand">
                <div className="discover">
                    <i onClick={routeContext.handleSidebar} className="fas fa-bars waves-effect waves-light sidebar__btn--open"></i>
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
            </div> : 
            <div className="layout__content">
                <div className="discover">
                    {
                        routeContext.isMobileHidden === false
                            ? <div className="sidebar__mobile--nav--open">
                                <i onClick={routeContext.handleMobileSidebar} className="fas fa-times waves-effect waves-light sidebar__btn--close"></i>
                                <ul className="sidebar__mobile--navigation--list">
                                    <NavLink onClick={routeContext.handleMobileCollapse} className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/" exact={true}><i className="fas fa-home sidebar__navigation--icon"></i> Dashboard</NavLink>
                                    <NavLink onClick={routeContext.handleMobileCollapse} className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/discover" exact={true}><i className="fas fa-search sidebar__navigation--icon"></i> Discover</NavLink>
                                    <NavLink onClick={routeContext.handleMobileCollapse} className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/conversations" exact={true}><i className="far fa-comments sidebar__navigation--icon"></i> Conversations</NavLink>
                                    <NavLink onClick={routeContext.handleMobileCollapse} className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/friends" exact={true}><i className="fas fa-user-friends sidebar__navigation--icon"></i> Friends List</NavLink>
                                    <NavLink onClick={routeContext.handleMobileCollapse} className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/settings" exact={true}><i className="fas fa-cogs sidebar__navigation--icon"></i> Settings</NavLink>
                                </ul>
                                <button onClick={routeContext.handleLogout} className="sidebar__mobile--navigation--logout waves-effect waves-light transparent">LOGOUT</button>
                            </div> 
                            : <div className="sidebar__mobile--nav--close">
                                <i className="fas fa-times waves-effect waves-light sidebar__btn--close"></i>
                            </div>
                    }
                    <i onClick={routeContext.handleMobileSidebar} className="fas fa-bars waves-effect waves-light sidebar__btn--mobile--open"></i>
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
    )}
    }
    </RouteContext.Consumer>
);

export default DiscoverContent;