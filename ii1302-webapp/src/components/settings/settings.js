import React, { Component } from "react";
import "./settings.css";

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetch().then(function (options) {
      document.getElementById("colourchoice").value = options.general.colour
      document.getElementById("amountMsg").value = options.general.amount_msg
    })
  }

  render() {
    return (
      <div className="settings-outer">
        <div className="form-popup" id="popupForm">
          <div className="form-container">
            <h3>Authenticate before proceeding</h3>
            <p>E-mail</p>
            <input type="text" id="email" placeholder="Your Current Email" name="email" required />
            <p>Password</p>
            <input type="password" id="psw" placeholder="Your Password" name="psw" required />
            <button className="btn" onClick={() => {
              if(this.state.operation === "password") {
                this.props.password(document.getElementById("email").value,
                  document.getElementById("psw").value, this.state.value);
                this.closeForm()
              }
              else {
                this.props.remove(document.getElementById("email").value,
                  document.getElementById("psw").value).then(() => {
                    this.closeForm();
                    window.location.href = "/"
                  }) 
              }
            }}
            >Log in</button>
            <button type="button" className="btn cancel" onClick={() => this.closeForm()}>Close</button>
          </div>
        </div>

        <div className="settings-inner">
          <h2>Settings</h2>

          <div className="msg-settings">
            <h3>Messages</h3>
            <div>
              <div>Colour:</div>
              <select id="colourchoice">
                <option value="inherit">default</option>
                <option value="red">red</option>
                <option value="yellow">yellow</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
              </select>
            </div>
            <div>
              How many messages should be shown?
              <input id="amountMsg" max="8" min="2" type="number"></input>
            </div>
            <div>
              <button onClick={() => this.props.general(document.getElementById("colourchoice").value, document.getElementById("amountMsg").value)}>
                Save
              </button>
            </div>
          </div>

          <div className="account-settings">
            <h3>Account</h3>
            <div>
              Change password
                <input id="newPass" placeholder="New password" type="password"/>
                <button onClick={() => this.openForm(document.getElementById("newPass").value, "password")}>Change</button>
            </div>
            <div>
              Remove account
              <button id="remove" onClick={() => this.openForm(null, "remove")}>Remove</button>
            </div>
            <div>
              When you remove your account, all data associated with your account will be removed. There will be no
              traces of you in the database. However, sent messages remain in the receivers' inbox, but your name
              will be removed from the messages.
            </div>
          </div>
        </div>
      </div>
    );
  }

  openForm(idValue, operation) {
    document.getElementById("popupForm").style.display = "block";
    this.setState({
      value: idValue,
      operation: operation
    })
  }

  closeForm() {
    document.getElementById("popupForm").style.display = "none";
  }
}

export default Settings;
