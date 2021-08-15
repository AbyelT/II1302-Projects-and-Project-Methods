import React, {Component} from 'react';
import "./MessageBox.css";

class MessageBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "LOADING",
            colour: "inherit",
            Messages: null,
            colourSelected: false,
            amountMsg: 0
        };
    }

    componentDidMount() {
        const msgs = this.props.fetch(document.getElementById("recv").value) 
        const options = this.props.general()
        Promise.all([msgs, options]).then(result => {
            this.setState({
                Messages: result[0] !== null ? result[0] : [],
                status: "LOADED",
                colour: result[1].general.colour,
                amountMsg: result[1].general.amount_msg
            })
        })
    }

    render() {
        let listOfMsg = null;
        switch (this.state.status) {
            case "LOADING":
                listOfMsg = <em>Loading...</em>;
                break;
            case "LOADED":
                let i = 0
                let totalMsg = this.state.Messages.length;
                let start = totalMsg > this.state.amountMsg ? totalMsg-this.state.amountMsg : 0
                listOfMsg = this.state.Messages.slice(start, totalMsg).map(message => (
                    <div className="sentMsgDiv" id="msgDiv" key={100+i++} style={{backgroundColor: this.state.colour}}>
                        <pre className="sentMsgTxt" id="sentMessage" key={message.text}>{message.text}</pre>
                        <p className="sentMsgTxt" id="messageStats" key={i++} >Read: {message.read.toString()}</p>
                    </div>
                ))
                break;
            default: 
                listOfMsg = <em>An unexpected error has occured, try reloading the page!...</em>;
                break;
        }

        return (
            <div className="messagebox-outer" >
                <div className="actual-box">
                    <div className="message-title">Write a new message</div>
                    <div className="receiver-box">
                        <select className="inputbox" id="recv" placeholder="Receiver" onChange={() => this.componentDidMount()}>   
                            <option defaultValue>elias</option>
                            <option>micke</option>
                        </select>
                    </div>
                    <div className="output-box">{ listOfMsg }</div>
                    <div className="message-box">
                        <textarea className="inputbox" id="msg" placeholder="Write your message here"/>
                    </div>
                </div>
                <button className="msgBtn" onClick={() => { this.props.message(
                    document.getElementById("recv").value, document.getElementById("msg").value)
                    document.getElementById("msg").value = '';
                    this.componentDidMount()
                }}>Send message</button>
            </div>
        );     
    }
}

export default MessageBox;
