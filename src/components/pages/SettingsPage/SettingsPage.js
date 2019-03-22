// importing modules
import React, { Component } from 'react';

//importing components
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import SideBar from '../../sidebar/Sidebar';
import SettingsContent from './SettingsContent';

class SettingsPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: {},
            selectedFile: null,
            selectedFileName: null
        }
        
        this.handleFileSelected = this.handleFileSelected.bind(this);
        this.handleCurrentUser = this.handleCurrentUser.bind(this);
    }

    componentDidMount(){
        this.handleCurrentUser();
    }

    handleFileSelected(e){
        e.preventDefault();
        // console.log(e.target.files[0]);
        
        // this.setState({ selectedFile: e.target.files[0]});

        const formData = new FormData();
        // formData.append('image', this.state.selectedFile);
        formData.append('image', e.target.files[0]);

        fetch('http://localhost:3000/uploadUserImage', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
            },
            body: formData
        })
        .then((data) => {
            return data.json();
        })
        .then((dataReturned) => {
            console.log(dataReturned);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleCurrentUser(){
        fetch('http://localhost:3000/getCurrentUser', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            this.setState({ user: {...usersData.user} });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return (
            <div>
                <Header />
                <Layout>
                    <SideBar user={this.state.user}/>
                    <SettingsContent 
                        user={this.state.user}
                        handleFileSelected={this.handleFileSelected}/>
                </Layout>
            </div>
        );
    };
}

export default SettingsPage;