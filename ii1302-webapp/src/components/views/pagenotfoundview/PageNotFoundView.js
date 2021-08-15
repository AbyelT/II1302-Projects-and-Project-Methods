import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import "./PageNotFoundView.css";

class PageNotFoundView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "loading"
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => this.changestatus(), 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    changestatus = () => {
        this.setState({status: "loaded"});
    }

    render() {
        console.log(this.state.status);
        let loader = null;
        let fourofour = null;

        switch(this.state.status) {
            case "loading":
                loader = <div className="spinner"/>
                break;
            case "loaded":
                loader = null;
                fourofour = <div>
                            <h1>404: Page not found.</h1>
                            <h3>No match for <code>{window.location.pathname}</code></h3>
                            <Link to="/"><h3>Back to home</h3></Link>
                            </div>
                break;
            default:
                fourofour = <div>Failed to load page.</div>
        }

        return (
            <div>
            <div className="outer-loader">{loader}</div>
            <div>{fourofour}</div>
            </div>
        );
    }
}

export default PageNotFoundView;