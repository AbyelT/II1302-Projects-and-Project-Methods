import React, { Component } from 'react';
import "./about.css";

class About extends Component {
    render() {
        return (
            <div className="aboutcontent">
                <div className="content">The Pager is a modern take on the classic pager. 
                It's a blast from the past.</div>
                <div className="content">Developers:
                    <li>Abyel Tesfay</li>
                    <li>Adam Liliemark</li>
                    <li>Alexander Jonsson</li>
                    <li>Elias Johansson</li>
                    <li>Mikael Andersson</li>
                </div>
                <div className="content">Made in 2020 as part of course II1302 Projects and Project Methods at KTH Royal Institute of Technology. The complete source code of both this website and
                the hardware associated with the project can be found at our git repos:
                <p><a href="https://github.com/adamliliemark/ii1302-webapp">Web application</a></p>
                <p><a href="https://gits-15.sys.kth.se/adamlil/ii1302-hardware">Hardware</a></p>
                The hardware used for this project is:
                <p>
                    <li>Discovery STM32F4</li>
                    <li>WiFi transceiver ESP8266</li>
                    <li>Button thingy</li>
                    <li>OLED display</li>
                    <li>Some cables</li>
                </p>
                The website runs on Firebase, utilizing Firebase's realtime database and cloud functions to manage messages and users. Messages are stored in the database and the hardware fetches
                the messages via HTTP requests. Authentication is handled via Firebase.
                </div>
            </div>
        );
    }
}

export default About;