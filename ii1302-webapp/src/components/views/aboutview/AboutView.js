import React, { Component } from 'react';
import HeadermenuContainer from "../../headermenu/headermenuContainer";
import SidebarContainer from "../../sidebar/sidebarContainer";
import Header from '../../header/header';
import Footer from "../../footer/footer";
import About from '../../about/about';
import "./AboutView.css";
import "../../../App.css";

class AboutView extends Component {
    render() {
        return (
            <div className="allview">
                <Header>
                    {this.props.user === "" ?   <h1>The Pager</h1> : <HeadermenuContainer/>}
                </Header>
                <div className="allContent">
                    <SidebarContainer/>
                    <About/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default AboutView;