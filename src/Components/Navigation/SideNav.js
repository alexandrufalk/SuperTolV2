import React from "react";
import "./sidenav.css";
import profile from "./🦆 icon _profile circled_ (1).png";
import arrow from "./Arrow.png";
import home from "./home-2.png";
import template from "./🦆 icon _template_.png";
import database from "./🦆 icon _database monitor_.png";
import add from "./🦆 icon _add case_.png";
import pdf from "./🦆 icon _save action floppy_.png";

const SideNav = () => {
  return (
    <div className="containerside">
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
        <img src={arrow}></img>
      </div>
      <div className="main">
        <div className="title">
          <div>MAIN</div>
        </div>
        <div className="List">
          <div className="con">
            <img src={home}></img>
            <div className="txt">Summary</div>
          </div>
          <div className="con">
            <img src={template}></img>
            <div className="txt">Template</div>
          </div>
          <div className="con">
            <img src={database}></img>
            <div className="txt">Database</div>
          </div>
          <div className="con">
            <img src={add}></img>
            <div className="txt">Add Case</div>
          </div>
          <div className="con">
            <img src={pdf}></img>
            <div className="txt">PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
