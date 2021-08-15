import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AuthenticatorContext } from "./../../util/Auth";
import "./home.css";

const Home = (props) => {
  const loginUser = (event) => {
    event.preventDefault();
    props.login(document.getElementById("user").value, document.getElementById("pass").value)
  }

  const { currentUser } = useContext(AuthenticatorContext);
  if (currentUser) return <Redirect to="/message" />;

  return (
    <div id="homecontent">
      <form
        onSubmit={(event) => loginUser(event)}>
        <div id="loginbox">
          <div>
            <div className="hometxt">Login to continue.</div>
          </div>
          <div>
            <div className="hometxt">Username:</div>
            <input id="user" />
          </div>
          <div>
            <div className="hometxt">Password:</div>
            <input id="pass" type="password" />
          </div>
          <div>
            <button
              onClick={(event) => loginUser(event)}>
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};



export default Home;
