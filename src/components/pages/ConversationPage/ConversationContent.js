// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

// importing react context
import RouteContext from '../../../context/routeContext';

// importing components
import ConversationItem from './ConversationItem';

const ConversationContent = (props) => {
    props.conversations.forEach((conversation) => {
        if(moment(conversation.expirationDate).format("MMM Do YY, h:mm:ss a") < moment(Date.now()).format("MMM Do YY, h:mm:ss a") ){
            props.handleRemoveConversation(conversation._id);
            console.log('conversation has expired!');
        }
        console.log(conversation);
    });

    return (
    <RouteContext.Consumer>
    {routeContext => {
    return (
        routeContext.isHidden ?
        <div className="layout__content--expand">
            <div className="conversation">
                <i onClick={routeContext.handleSidebar} className="fas fa-bars waves-effect waves-light sidebar__btn--open"></i>
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
        </div> : 
        <div className="layout__content">
            <div className="conversation">
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
    )}
    }
    </RouteContext.Consumer>
    );
};

export default ConversationContent;