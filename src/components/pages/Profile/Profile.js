import React, { Component } from 'react'
// importing components
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import SideBar from '../../sidebar/Sidebar';

class Profile extends Component {
    constructor(props){
        super(props);

        this.handleProfileDetails = this.handleProfileDetails.bind(this);
    }

    componentDidMount(){
        this.handleProfileDetails();
    }

    handleProfileDetails(){
        const profileId = this.props.match.params.id;
        console.log(profileId);
    }

    render(){
        return(
            <div>
                <Header />
                <Layout>
                    <SideBar />
                    <div className="profile">
                    
                    </div>
                </Layout>
            </div>
        );
    };
};

export default Profile;