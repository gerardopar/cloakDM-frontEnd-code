// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
// importing react context
import RouteContext from '../../../context/routeContext';

const DashboardContent = (props) => (
    <RouteContext.Consumer>
        {routeContext => {
        return (
            routeContext.isHidden ?
            <div className="layout__content--expand">
                <div className="dashboard">
                    <i onClick={routeContext.handleSidebar} className="fas fa-bars waves-effect waves-light sidebar__btn--open"></i>
                    <div className="dashboard__profile z-depth-5">
                        {
                            props.user.profileImg === 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' 
                                ?   <img className="dashboard__user--img" src={props.user.profileImg} alt="default user img" /> 
                                :   <img className="dashboard__user--img" src={'http://localhost:3000/' + props.user.profileImg} alt="user img" /> 
                        }
                        <p className="dashboard__user--name">@{props.user.username}</p>
                        <p className="dashboard__user--name">Los Angeles, CA</p>
                        <div className="dashboard__user--details">
                            <div className="dashboard__user--details--col">
                                <i className="fas fa-user-friends dashboard--icon"></i>
                                <p className="dashboard__text">CONNECTIONS</p>
                                <h1 className="dashboard__title">{props.friendsListLength}</h1>
                            </div>
                            <div className="dashboard__user--details--col">
                                <i className="far fa-comments dashboard--icon"></i>
                                <p className="dashboard__text">CONVERSATIONS</p>
                                <h1 className="dashboard__title">{props.conversationsListLength}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : 
            <div className="layout__content">
                <div className="dashboard">
                    {/* mobile navigation testing */}
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
                    <div className="dashboard__profile z-depth-5">
                        {
                            props.user.profileImg === 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' 
                                ?   <img className="dashboard__user--img" src={props.user.profileImg} alt="default user img" /> 
                                :   <img className="dashboard__user--img" src={'http://localhost:3000/' + props.user.profileImg} alt="user img" /> 
                        }
                        <p className="dashboard__user--name">@{props.user.username}</p>
                        <p className="dashboard__user--name">Los Angeles, CA</p>
                        <div className="dashboard__user--details">
                            <div className="dashboard__user--details--col">
                                <i className="fas fa-user-friends dashboard--icon"></i>
                                <p className="dashboard__text">CONNECTIONS</p>
                                <h1 className="dashboard__title">{props.friendsListLength}</h1>
                            </div>
                            <div className="dashboard__user--details--col">
                                <i className="far fa-comments dashboard--icon"></i>
                                <p className="dashboard__text">CONVERSATIONS</p>
                                <h1 className="dashboard__title">{props.conversationsListLength}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    }
    </RouteContext.Consumer>
)

export default DashboardContent;

// <div className="dashboard">
//             <h1 className="dashboard__title">welcome back</h1>
//         </div>