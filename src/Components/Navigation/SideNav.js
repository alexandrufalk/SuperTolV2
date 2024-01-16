import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidenav.css";
import profile from "./🦆 icon _profile circled_ (1).png";
import arrow from "./Arrow.png";
import home from "./home-2.png";
import template from "./🦆 icon _template_.png";
import database from "./🦆 icon _database monitor_.png";
import add from "./🦆 icon _add case_.png";
import pdf from "./🦆 icon _save action floppy_.png";
import logout from "./🦆 icon _log out_.png";

const SideNav = () => {
  const [viewNav, setViewNav] = useState(false);
  const open = "containerside";
  const closed = "containerside1";

  const toggleArrow = () => {
    setViewNav(!viewNav);
  };
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login-page");
  };

  const scrollToSummary = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling animation
    });
  };

  const scrollToDatabase = () => {
    window.scrollTo({
      top: 210,
      behavior: "smooth", // Optional: Smooth scrolling animation
    });
  };
  return (
    <div className={viewNav ? open : closed}>
      {viewNav && (
        <>
          <div className="header">
            <div className="profile">
              <img src={profile}></img>
            </div>
            <div className="profilename">
              <div className="jobtitle">Web Developer</div>
              <div className="name">Alex F</div>
            </div>
          </div>

          <div className="arrow">
            <img src={arrow} onClick={toggleArrow}></img>
          </div>
          <div className="main">
            <div className="title">
              <div>MAIN</div>
            </div>
            <div className="List">
              <div className="con">
                <img src={home}></img>
                <div className="txt" onClick={scrollToSummary}>
                  Summary
                </div>
              </div>
              <div className="con">
                <img src={template}></img>
                <div className="txt">New Template</div>
              </div>
              <div className="con">
                <img src={database}></img>
                <div className="txt" onClick={scrollToDatabase}>
                  Database
                </div>
              </div>
              <div className="con">
                <img src={add}></img>
                <div className="txt">Add Case</div>
              </div>
              <div className="con">
                <img src={pdf}></img>
                <div className="txt">PDF</div>
              </div>
              <div className="con logout">
                <img src={logout}></img>
                <div className="txt" onClick={navigateToLogin}>
                  Logout
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!viewNav && (
        <>
          <div className="header">
            <div className="profile">
              <img src={profile}></img>
            </div>
          </div>

          <div className="arrow2">
            <img src={arrow} onClick={toggleArrow}></img>
          </div>
          <div className="main">
            <div className="List">
              <div className="con" onClick={scrollToSummary}>
                <img src={home}></img>
              </div>
              <div className="con">
                <img src={template}></img>
              </div>
              <div className="con">
                <img src={database} onClick={scrollToDatabase}></img>
              </div>
              <div className="con">
                <img src={add}></img>
              </div>
              <div className="con">
                <img src={pdf}></img>
              </div>
              <div className="con logout">
                <img src={logout} onClick={navigateToLogin}></img>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideNav;
