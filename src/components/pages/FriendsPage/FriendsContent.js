import React from 'react';

import FriendItem from './FriendsItem';
import FriendRequestItem from './FriendsRequestItem';
import FriendPendingItem from './FriendsPendingItem';

const FriendsContent = (props) => (
    <div className="layout__content">
        <div className="friends">
        
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
)

export default FriendsContent;