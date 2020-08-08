import React from 'react';
import NavigatorTop from './Component/NavigatorTop/NavigatorTop'
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import Home from './Component/Home/Home'
import Footer from './Component/Footer/Footer';
import CardCenter from './Component/CardCenter/CardCenter'
import Login from './Component/Login/Login'
import SignUp from './Component/SignUp/SignUp'
import SubSignUp from './Component/SignUp/SubSignUp/SubSIgnUp'
import NaviSide from './Component/NaviSide/NaviSide'
import { data } from './Component/Store/localStorage'
import './App.css'
export const myContext = React.createContext("userProfile");

export default class App extends React.Component {

    constructor() {
        super()
        this.state = {
            passProps: 0
        }
    }

    upDateLocal = () => {
        console.log('the app.js is being invoked______________________________')
        console.log(this.props)
        console.log("Now the current user would be:", data.get('currentUser'))
        this.currentUser = data.get('currentUser')
        this.userProfile = data.get(this.currentUser)
        this.forceUpdate();
        return
    }

    upDateHomeInfo = (DateObject) => {
        let { passProps } = this.state
        passProps = DateObject
        this.setState({
            passProps
        })
    }

    componentWillMount() {
        this.upDateLocal()
    }

    PassToHome = (props) => {
        return (
            <Home
                upDateLocal={this.upDateLocal}
                upDateHomeInfo={this.upDateHomeInfo}
                {...props}
            />
        );
    }

    PassToLogin = (props) => {
        return (
            <Login
                upDateLocal={this.upDateLocal}
                {...props}
            />
        );
    }

    render() {
        const { passProps } = this.state
        return (
            <Router>
                <NavigatorTop />
                <myContext.Provider value={this.userProfile}>
                    <NaviSide />
                </myContext.Provider>
                <switch >
                    <Route exact path="/" render={this.PassToHome} />
                    <Route exact path="/login" render={this.PassToLogin} />
                    <Route exact path="/sign-up" component={SignUp} />
                    <Route exact path="/sub-sign-up" component={SubSignUp} />
                </switch>
                <CardCenter passProps={passProps} />
                <Footer />
            </Router>
        );
    }
}