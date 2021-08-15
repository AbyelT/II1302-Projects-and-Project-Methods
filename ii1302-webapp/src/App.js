import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomeView from "./components/views/homeview/HomeView.js";
import AboutViewContainer from "./components/views/aboutview/AboutViewContainer.js";
import Settingsview from "./components/views/settingsview/SettingsView";
import MessageView from "./components/views/dashboardview/MessageView";
import PageNotFoundView from "./components/views/pagenotfoundview/PageNotFoundView";
import PrivateRoute from "./components/privateRoute/privateRouter";
import { AuthenticatorProvider } from "./util/Auth";
import * as firebase from "firebase/app";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                //console.log(user)
            } 
            else {
                //console.log("not logged in")
            }
        })
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }

    render() {
        return (
            <div className="App">
                    <Router>
                        <AuthenticatorProvider>
                            <Switch>
                                <Route key="userhome" exact path="/" component={HomeView}/>
                                <PrivateRoute path="/message" component={MessageView} />
                                <PrivateRoute path="/settings"  component={Settingsview} />
                                <Route path="/about" render={() => <AboutViewContainer/>}/>
                                <Route path="*" component={PageNotFoundView}/>
                            </Switch> 
                        </AuthenticatorProvider>
                    </Router>
            </div>
        );
    }
}

export default App
