import React from "react";
import "./LogIn.css";
import backgroundImageUrl from "./backgrounfg2.jpg";
import logoLI from "./Logo3.png";
import googleL from "./google.png";

const LogIn = () => {
  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Your component content goes here */}
      {/* <h1>Hello, World!</h1> */}
      <div
        className="logoLI"
        style={{ backgroundImage: `url(${logoLI})` }}
      ></div>
      <div className="login">
        <div className="containerwb">
          <p className="wb">Welcome back</p>
          <p className="wb2">
            We've missed you! Please sign in to catch up on what you've missed
          </p>
        </div>
        <div className="login2">
          <div className="containerGoogle">
            <div className="googlebt">
              <div
                className="googleLogo"
                style={{ backgroundImage: `url(${googleL})` }}
              ></div>
              <div className="googleLI">Log in with Google</div>
            </div>
            <p className="wb2">or</p>
          </div>

          <div className="containerLI">
            <div className="containerLI1">
              <div className="containerEmail">
                <div className="email">Email</div>
                <div className="containerEnter">
                  <div className="textEnter">Enter your email</div>
                </div>
              </div>
              <div className="containerEmail">
                <div className="email">Password</div>
                <div className="containerEnter">
                  <div className="textEnter">Enter your password</div>
                </div>
              </div>
            </div>
            <div className="remember">
              <div className="check">
                <div className="rectangle"></div>
                <div className="rememberme">Remember Me</div>
              </div>
              <div className="forgot">Forgot Password</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
