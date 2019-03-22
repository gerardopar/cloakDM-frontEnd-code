// importing modules
import React from 'react';

// importing assets
import default_user_img from '../../../assets/img/user.svg';

const SettingsContent = (props) => (
    <div className="layout__content">
        <div className="settings">
            <div className="settings__img--wrap">
                {
                    props.user.profileImg === 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png' 
                        ?   <img className="sidebar__user--img" src={props.user.profileImg} alt="default user img" /> 
                        :   <img className="sidebar__user--img" src={'http://localhost:3000/' + props.user.profileImg} alt="default user img" /> 
                }
                <input type="file" onChange={props.handleFileSelected} />
            </div>
        </div>
    </div>
)

export default SettingsContent;