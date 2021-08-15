import React, {Component} from 'react';
import { Link } from "react-router-dom";
import "./sidebar.css";

class Sidebar extends Component {

    componentDidMount() {
        this.toggleSidebar()
    }

    componentDidUpdate() {
        this.toggleSidebar()
    }

    toggleSidebar = () => {
        if(this.props.sidebar) {
            document.getElementById("sb").style.width = "200px";
            document.getElementById("sb").style.borderWidth = "2px";
        }
        else {
            document.getElementById("sb").style.width = "0px";
            document.getElementById("sb").style.borderWidth = "0px";
        }
    }

    render() {
        return (
            <div className="sb" id="sb"> 
                <Link to="/settings">
                    Settings
                </Link>
                <Link to="/message">
                    Messages
                </Link>
                <Link to="/about">
                    About
                </Link>
            </div>
        );
    }
}


export default Sidebar;
