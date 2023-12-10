import React, { useState } from "react";
import "./main.css";
import updown from "./up-down.png";
import rectangle from "./Rectangle.png";
import del from "./Delete.png";

const Main = () => {
  const [viewItems, setViewItems] = useState(false);
  const toggleDown = () => {
    setViewItems(!viewItems);
  };
  return (
    <div className="main-container">
      {/* Your grid content for Main */}
      <div className="main-item">
        <div className="dropdown-menu">
          <div className="drop-container">
            <div className="label">Projects</div>
            <div className="dropdown-box">
              <div className="drop-text">Select project name</div>
              <img src={updown} onClick={toggleDown}></img>
            </div>
          </div>
          {viewItems && (
            <div className="item-container">
              <div className="item-content">
                <div className="item-list">
                  <img src={rectangle}></img>
                  <div className="text-item">Option 1</div>
                  <img src={del}></img>
                </div>
              </div>
              <div className="item-content">
                <div className="item-list">
                  <img src={rectangle}></img>
                  <div className="text-item">Option 2</div>
                  <img src={del}></img>
                </div>
              </div>
              <div className="item-content">
                <div className="item-list">
                  <img src={rectangle}></img>
                  <div className="text-item">Option 3</div>
                  <img src={del}></img>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="main-item">Item 2</div>
      <div className="main-item">Item 3</div>
      <div className="main-item">Item 4</div>
      <div className="main-item">Item 5</div>
      <div className="main-item">Item 6</div>
    </div>
  );
};

export default Main;
