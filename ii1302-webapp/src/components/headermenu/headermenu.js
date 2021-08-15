import React, { Component } from 'react';
import "./headermenu.css";

class Headermenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ""
        }
    }

    componentDidMount() {
        this.setState({user: this.props.user})
    }

    render() {
        if(this.state.user) {
            return (
                <div className="headermenu">
                    <div>
                        <h1>The Pager</h1>
               
                        <p className="sidebarToggle" onClick={() => this.props.toggle()}>
                        {this.props.sidebar !== true ? "OPEN MENU" : "CLOSE MENU"}</p>
                    </div>

                    <div className="menu">
                        <div>Logged in as: {this.state.user}</div>
                        <button onClick={() => { 
                            this.props.exit();
                            window.location.href = "/"
                        }}>Log out</button>
                    </div>
            
                </div>
            );
        }
        else {
            return <div></div>
        } 
    }
}

export default Headermenu;
