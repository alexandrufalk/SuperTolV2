import React, { useState } from "react";
import "./LogIn.css";
import backgroundImageUrl from "./backgrounfg2.jpg";

import logoLI from "./Logo3.png";
import googleL from "./google.png";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();

  const navigateToApp = () => {
    navigate("/App");
  };
  return (
    <div className="bodyLI">
      <div className="container2">
        <div className="a"></div>

        <div className="b">
          {!isSignUp && (
            <div className="containerwb">
              <p className="wb">Welcome back</p>
              <p className="wb2">
                We've missed you! Please sign in to catch up on what you've
                missed
              </p>
            </div>
          )}
          {isSignUp && (
            <div className="containerwb">
              <p className="wb">Sign Up</p>
            </div>
          )}
          <div className="login2">
            {!isSignUp && (
              <div className="containerGoogle">
                <div className="googlebt" onClick={navigateToApp}>
                  <div
                    className="googleLogo"
                    style={{ backgroundImage: `url(${googleL})` }}
                  ></div>
                  <div className="googleLI">Log in with Google</div>
                </div>
                <p className="or">or</p>
              </div>
            )}

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
              {!isSignUp && (
                <div className="btnLogin">
                  <div className="LoginTxt">Log in</div>
                </div>
              )}
              {isSignUp && (
                <div className="btnLogin">
                  <div className="LoginTxt">Sign Up</div>
                </div>
              )}
            </div>
          </div>

          {!isSignUp && (
            <div className="containerbottom">
              <div className="bottomTxt">Don't have an account yet? </div>
              <div
                className="bottomSignUp"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                Sign up
              </div>
              <div className="bottomTxt">now to join our community</div>
            </div>
          )}
          {isSignUp && (
            <div className="containerGoogle">
              <p className="or">or</p>
              <div className="googlebt" onClick={navigateToApp}>
                <div
                  className="googleLogo"
                  style={{ backgroundImage: `url(${googleL})` }}
                ></div>
                <div className="googleLI">Log in with Google</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
