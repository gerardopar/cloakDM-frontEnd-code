// importing modules
import React, { Component } from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment';
// importing context
import RouteContext from '../context/routeContext';
// importing components
import LoginPage from '../components/pages/LoginPage/LoginPage';
import DashboardPage from '../components/pages/DashboardPage/DashboardPage';
import FriendsPage from '../components/pages/FriendsPage/FriendsPage';
import DiscoverPage from '../components/pages/DiscoverPage/DiscoverPage';
import ConversationPage from '../components/pages/ConversationPage/ConversationPage';
import SettingsPage from '../components/pages/SettingsPage/SettingsPage';
import SignupPage from '../components/pages/SignupPage/SignupPage';
import Profile from '../components/pages/Profile/Profile';
import PrivateConversationPage from '../components/pages/PrivateConversationPage/PrivateConversationPage';
import ResetPage from '../components/pages/ResetPage/ResetPage';
import UpdatePasswordPage from '../components/pages/UpdatePasswordPage/UpdatePasswordPage';
// app history initialized
export const history = createHistory();

//AppRouter component
class AppRouter extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isAuth: false,
            token: null,
            user: {},
            userId: null,
            isHidden: false,
            isMobileHidden: true
        }

        this.handleSidebar = this.handleSidebar.bind(this);
        this.handleMobileSidebar = this.handleMobileSidebar.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAutoLogout = this.handleAutoLogout.bind(this);
    }

    componentDidMount() {
        // checking if auth token is set
        const token = localStorage.getItem('token');
        const expDate = localStorage.getItem('tokenExpires');
        const userId = localStorage.getItem('userId');
        const date = Date.now(); // current date
        const currentDate = moment(date).format('MMMM Do YYYY, h:mm:ss a'); // current date format

        if(token) {
            this.setState({ isAuth: true, token: token, userId: userId });
            this.handleCurrentUser(token);
        }
        // ! testing auto log out
        // if(expDate < currentDate) {
        //     this.handleAutoLogout();
        // }
    }

    handleSidebar(){
        this.setState({ isHidden: !this.state.isHidden  });
    }

    handleMobileSidebar(){
        this.setState({ isMobileHidden: !this.state.isMobileHidden  });
        console.log(this.state.isMobileHidden);
    }

    // method: authenticates user
    handleLogin(e){
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error('Validation failed.');
            }
            if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Could not authenticate you!');
            }
            return res.json();
        })
        .then(resData => {
            this.setState(() => ({
                isAuth: true,
                token: resData.token,
            }));
            const date = Date.now(); // new token date
            const dateAdded = moment(date).format('MMMM Do YYYY, h:mm:ss a'); // token creation date
            const dateAhead = moment(date).add(1, 'h'); // token life
            const dateToBeRemoved = moment(dateAhead._d).format('MMMM Do YYYY, h:mm:ss a'); // token remove date
            localStorage.setItem('tokenCreated', dateAdded);
            localStorage.setItem('tokenExpires', dateToBeRemoved);
            localStorage.setItem('isAuth', true);
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
        })
        .catch(err => {
            console.log(err);
        });
    };

    // method: handles logout
    handleLogout(e){
        e.preventDefault();
        this.setState(() => ({
            isAuth: false,
            token: null
        }));
        localStorage.removeItem('tokenCreated');
        localStorage.removeItem('tokenExpires');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        history.push('/');
    }
    
    // method : handles Auto logout 
    handleAutoLogout(){
        this.setState(() => ({
            isAuth: false,
            token: null
        }));
        localStorage.removeItem('tokenCreated');
        localStorage.removeItem('tokenExpires');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        history.push('/');
    }

    handleCurrentUser(token){
        fetch('http://localhost:3000/getCurrentUser', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((usersData) => {
            console.log('user data', usersData);
            this.setState({ user: {...usersData.user} });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        let routes = (
            <Switch>
            <Route path="/" exact={true}
                render={props => (
                    <LoginPage
                    {...props}
                    handleLogin={this.handleLogin} />
            )}/>
            <Route path="/signup" exact={true}
                    component={SignupPage}
            />
            <Route path="/reset" exact={true}
                    component={ResetPage}
            />
            <Route path="/reset/:token" exact={true}
                    component={UpdatePasswordPage}
            />
            {/*<Redirect to="/" />*/}
            </Switch>
        );
        if(this.state.isAuth) {
            routes = (
            <Switch>   
            <Route path="/" exact={true}
                render={props => (
                    <DashboardPage
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}/>
            )}/>
            <Route path="/discover" exact={true}
                render={props => (
                    <DiscoverPage
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}/>
            )}/>
            <Route path="/conversations" exact={true}
                render={props => (
                    <ConversationPage
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}
                    userId={this.state.userId}/>
            )}/>
            <Route path="/friends" exact={true}
                render={props => (
                    <FriendsPage
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}/>
            )}/>
            <Route path="/settings" exact={true}
                render={props => (
                    <SettingsPage
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}/>
            )}/>
            <Route path="/profile/:id" exact={true}
                render={props => (
                    <Profile
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}/>
            )}/>
            <Route path="/conversation/:id" exact={true}
                render={props => (
                    <PrivateConversationPage
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}
                    userId={this.state.userId}/>
            )}/>
            {/*<Redirect to="/" />*/}
            </Switch>
            );
        }
        return (
        <Router history={history}>
            <div>
            <RouteContext.Provider
            value={{ 
                    handleMobileSidebar: this.handleMobileSidebar,
                    handleSidebar: this.handleSidebar,
                    handleLogout: this.handleLogout,
                    isAuth: this.state.isAuth,
                    userData: {...this.state.user},
                    isHidden: this.state.isHidden,
                    isMobileHidden: this.state.isMobileHidden
                }}>
                {routes}
            </RouteContext.Provider>
            </div>
        </Router>
        )
    }
};

export default AppRouter;