import React, { useState } from "react";
import "./NavigationBar.css";
import logo from "./Ellipse 5.svg";
import home from "./home-2.png";
import template from "./🦆 icon _template_.png";
import database from "./🦆 icon _database monitor_.png";
import settings from "./setting-2.png";
import profile from "./🦆 icon _profile circled_ (1).png";
import logout from "./🦆 icon _log out_.png";
// import add from "./🦆 icon _add case_.png";
// import pdf from "./🦆 icon _save action floppy_.png";

const NavigationBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    console.log("Dropdown");
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="containernav sticky">
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
