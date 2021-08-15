import React, { Component } from 'react';
import HeadermenuContainer from "../../headermenu/headermenuContainer";
import SidebarContainer from "../../sidebar/sidebarContainer";
import MessageContainer from "../../messagebox/MessageContainer";
import Header from '../../header/header';
import Footer from "../../footer/footer";
import "./MessageView.css";
import "../../../App.css";

class DashBoardView extends Component {
    render() {
        return (
            <div className="allview">
                <Header>
                    <HeadermenuContainer/>
                </Header>
                <div className="allContent">
                    <SidebarContainer/>
                    <div className="boxes">
                        <MessageContainer/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default DashBoardView;