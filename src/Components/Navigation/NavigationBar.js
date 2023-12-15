import React, { useState } from "react";
import "./NavigationBar.css";
import logo from "./Ellipse 5.svg";
import home from "./home-2.png";
import template from "./🦆 icon _template_.png";
import database from "./🦆 icon _database monitor_.png";
import settings from "./setting-2.png";
import profile from "./🦆 icon _profile circled_ (1).png";
import logout from "./🦆 icon _log out_.png";
import add from "./🦆 icon _add case_.png";
import pdf from "./🦆 icon _save action floppy_.png";

const NavigationBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSideNav, setSideNav] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleNavToggle = () => {
    setSideNav(!isSideNav);
  };
  return (
    <div className="containernav sticky">
      <div className="nav-mobile">
        <div className="summary">
          <div className="dropbtn" onClick={handleNavToggle}>
            ︾
          </div>
        </div>
        {isSideNav && (
          <div className="dropdown-content-m">
            <div className="con-m">
              <img src={home}></img>
            </div>
            <div className="con-m">
              <img src={template}></img>
            </div>
            <div className="con-m">
              <img src={database}></img>
            </div>
            <div className="con-m">
              <img src={add}></img>
            </div>
            <div className="con-m">
              <img src={pdf}></img>
            </div>
            <a href="http://localhost:3003/login-page" className="con-m">
              <img src={logout}></img>
            </a>
          </div>
        )}
      </div>
      <div className="brand">
        <img src={logo}></img>
        <div className="logotxt">SuperTol</div>
      </div>
      <div className="center">
        <div className="center1">
          <img src={home}></img>
          <div className="summary">Summary</div>
        </div>
        <div className="center1">
          <img src={template}></img>
          <div className="summary">Template</div>
        </div>
        <div className="center1">
          <img src={database}></img>
          <div className="summary">Database</div>
        </div>
      </div>

      <div className="right">
        <img src={settings} className="setimg"></img>
        <div className="summary">
          <div className="dropbtn" onClick={handleDropdownToggle}>
            Settings
          </div>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <a href="http://localhost:3003/login-page">Logout</a>
            <a href="http://localhost:3003/login-page">Update profile</a>
          </div>
        )}

        <img src={profile} className="profile"></img>
      </div>
    </div>
  );
};

export default NavigationBar;
