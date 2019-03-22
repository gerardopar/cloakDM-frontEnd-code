import React from 'react';

const DashboardContent = (props) => (
    <div className="layout__content">
        <div className="dashboard">
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
)

export default DashboardContent;

// <div className="dashboard">
//             <h1 className="dashboard__title">welcome back</h1>
//         </div>