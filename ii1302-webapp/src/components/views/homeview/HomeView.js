import React, {Component} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import HomeContainer from '../../home/homeContainer';
import "./HomeView.css";

class HomeView extends Component {
    render() {
        return (
            <div className="homeview">
                <Header>
                    <h1>The Pager</h1>
                </Header>
                <HomeContainer/>
                <Footer/>
            </div>
        );
    }
}

export default HomeView;
