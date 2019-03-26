// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
// context
import RouteContext from '../../context/routeContext';

const SideBar = (props) => {

    return (
        <RouteContext.Consumer>
        {routeContext => {
        return (
            routeContext.isHidden ? 
            <div className="layout__sidebar--close z-depth-5">
                <div className="sidebar"></div> 
            </div>
            : 
            <div className="layout__sidebar--open z-depth-5">
            <div className="sidebar">
                {/*sidebar close btn*/}
                <i onClick={routeContext.handleSidebar} className="fas fa-times waves-effect waves-light sidebar__btn--close"></i>
                <div className="sidebar__user--details--wrap">
                    {
                        props.user.profileImg === 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' 
                            ?   <img className="sidebar__user--img" src={props.user.profileImg} alt="" /> 
                            :   <img className="sidebar__user--img" src={'http://localhost:3000/' + props.user.profileImg} alt="" /> 
                    }
                    <p className="sidebar__user--text">@{props.user.username}</p>
                </div>
                <div className="sidebar__navigation">
                    <ul className="sidebar__navigation--list">
                        <NavLink className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/" exact={true}><i className="fas fa-home sidebar__navigation--icon"></i> Dashboard</NavLink>
                        <NavLink className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/discover" exact={true}><i className="fas fa-search sidebar__navigation--icon"></i> Discover</NavLink>
                        <NavLink className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/conversations" exact={true}><i className="far fa-comments sidebar__navigation--icon"></i> Conversations</NavLink>
                        <NavLink className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/friends" exact={true}><i className="fas fa-user-friends sidebar__navigation--icon"></i> Friends List</NavLink>
                        <NavLink className="sidebar__navigation--link waves-effect waves-light" activeClassName="sidebar__navigation--link--active" to="/settings" exact={true}><i className="fas fa-cogs sidebar__navigation--icon"></i> Settings</NavLink>
                    </ul>
                    
                    <button onClick={routeContext.handleLogout} className="sidebar__navigation--logout waves-effect waves-light transparent">LOGOUT</button>
                    
                </div>
            </div>
            </div>
            )}
        }
        </RouteContext.Consumer>
    );
};

export default SideBar;