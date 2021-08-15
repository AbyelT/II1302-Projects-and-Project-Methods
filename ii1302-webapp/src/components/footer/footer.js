import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./footer.css";

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footercontent">
                    <div>
                        {window.location.pathname !== "/about" ?
                            <Link className="aboutLink" to="/about">
                                About this page
                            </Link> :
                            <Link className="aboutLink" to="/">
                                Return to start
                            </Link>
                        }
                    </div>
                    <div>
                        Find out more on our <a href="https://github.com/adamliliemark/ii1302-webapp/wiki">GitHub Wiki</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;