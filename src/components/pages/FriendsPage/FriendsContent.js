// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';

// importing react context
import RouteContext from '../../../context/routeContext';

// importing components
import FriendItem from './FriendsItem';
import FriendRequestItem from './FriendsRequestItem';
import FriendPendingItem from './FriendsPendingItem';

const FriendsContent = (props) => (
    <RouteContext.Consumer>
    {routeContext => {
    return (
        routeContext.isHidden ?
        <div className="layout__content--expand">
            <div className="friends">
            <i onClick={routeContext.handleSidebar} className="fas fa-bars waves-effect waves-light sidebar__btn--open"></i>
            <div className="layout__content--title--wrap">
                <p className="layout__content--title">Friend Requests</p>
            </div>
            {
                props.friendRequests.length !== 0 ? props.friendRequests.map((friends, index) => (
                    <FriendRequestItem 
                        handleAddFriend={props.handleAddFriend}
                        handleRejectFriend={props.handleRejectFriend}
                        {...friends}
                        key={index}
                        />
                )) : <div className="layout__content--nca--wrap"><h4 className="layout__content--nca">No friend requests available</h4></div>
            }

            <div className="layout__content--title--wrap">
                <p className="layout__content--title">Pending Requests</p>
            </div>
            {
                props.pendingRequests.length !== 0 ? props.pendingRequests.map((friends, index) => (
                    <FriendPendingItem
                        handleCancelPendingRequest={props.handleCancelPendingRequest}
                        {...friends}
                        key={index}
                        /> 
                )) : <div className="layout__content--nca--wrap"><h4 className="layout__content--nca">No pending requests available</h4></div>
            }

            <div className="layout__content--title--wrap">
                <p className="layout__content--title">Friends List</p>
            </div>
            {
                props.friendsList.length !== 0 ? props.friendsList.map((friends, index) => (
                    <FriendItem 
                        handleRemoveFriend={props.handleRemoveFriend}
                        handleCreateConvo={props.handleCreateConvo}
                        {...friends}
                        key={index}
                        />
                )) : <div className="layout__content--nca--wrap"><h4 className="layout__content--nca">No friends available</h4></div>
            }
            </div>
        </div> : 
        <div className="layout__content">
            <div className="friends">
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
            <div className="layout__content--title--wrap">
                <p className="layout__content--title">Friend Requests</p>
            </div>
            {
                props.friendRequests.length !== 0 ? props.friendRequests.map((friends, index) => (
                    <FriendRequestItem 
                        handleAddFriend={props.handleAddFriend}
                        handleRejectFriend={props.handleRejectFriend}
                        {...friends}
                        key={index}
                        />
                )) : <div className="layout__content--nca--wrap"><h4 className="layout__content--nca">No friend requests available</h4></div>
            }

            <div className="layout__content--title--wrap">
                <p className="layout__content--title">Pending Requests</p>
            </div>
            {
                props.pendingRequests.length !== 0 ? props.pendingRequests.map((friends, index) => (
                    <FriendPendingItem
                        handleCancelPendingRequest={props.handleCancelPendingRequest}
                        {...friends}
                        key={index}
                        /> 
                )) : <div className="layout__content--nca--wrap"><h4 className="layout__content--nca">No pending requests available</h4></div>
            }

            <div className="layout__content--title--wrap">
                <p className="layout__content--title">Friends List</p>
            </div>
            {
                props.friendsList.length !== 0 ? props.friendsList.map((friends, index) => (
                    <FriendItem 
                        handleRemoveFriend={props.handleRemoveFriend}
                        handleCreateConvo={props.handleCreateConvo}
                        {...friends}
                        key={index}
                        />
                )) : <div className="layout__content--nca--wrap"><h4 className="layout__content--nca">No friends available</h4></div>
            }
            </div>
        </div>
    )}
    }
    </RouteContext.Consumer>
)

export default FriendsContent;