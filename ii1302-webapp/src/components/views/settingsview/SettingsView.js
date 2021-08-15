import React, { Component } from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SettingsContainer from "../../settings/settingsContainer";
import SidebarContainer from "../../sidebar/sidebarContainer";
import HeadermenuContainer from "../../headermenu/headermenuContainer";
import "./SettingsView.css";
import "../../sidebar/sidebar.css";
import "../../../App.css";

class SettingsView extends Component {
  render() {
    return (
      <div className="allview">
          <Header>
              <HeadermenuContainer/>
          </Header>
        <div className="allContent">
          <SidebarContainer />
          <SettingsContainer/>
        </div>
          <Footer/>
      </div>
    );
  }
}

export default SettingsView;
