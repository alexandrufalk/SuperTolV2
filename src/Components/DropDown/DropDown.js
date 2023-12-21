import React, { useState } from "react";
import updown from "./up-down.png";
import rectangle from "./Rectangle.png";
import del from "./Delete.png";

const Dropdown = ({
  name,
  database,
  isDatabaseProjects,
  handleProjectClick,
  Remove,
  handleNew,
}) => {
  const [viewItems, setViewItems] = useState(false);
  const [headerName, setheaderName] = useState(`Select ${name} name`);

  const toggleDown = () => {
    setViewItems(!viewItems);
  };

  const handleButtonClick = () => {
    // Call the handeleNew prop when a button is clicked
    handleNew();
  };

  console.log(`Dropdown database ${name}`, database, isDatabaseProjects);

  return (
    <div className="dropdown-menu">
      <div className="drop-container">
        <div className="label">{`${name}s`}</div>
        <div className="dropdown-box">
          <div className="drop-text">{headerName}</div>
          <img src={updown} onClick={toggleDown}></img>
        </div>
      </div>
      {viewItems && (
        <div className="item-container">
          {isDatabaseProjects &&
            database.map((n) => (
              <div className="item-content">
                <div className="item-list">
                  <img src={rectangle}></img>
                  <div
                    className="text-item"
                    onClick={() => {
                      handleProjectClick(
                        name === "Project" ? n.ProjectName : n.TemplateName
                      );
                      setheaderName(
                        name === "Project" ? n.ProjectName : n.TemplateName
                      );
                    }}
                  >
                    {name === "Project" ? n.ProjectName : n.TemplateName}
                  </div>
                  <img
                    src={del}
                    onClick={() => {
                      const confirmRemove = window.confirm(
                        `Do you want to remove this ${name}?`
                      );
                      if (confirmRemove) {
                        Remove(n.ID);
                      }
                    }}
                  ></img>
                </div>
              </div>
            ))}
          <div className="item-content">
            <div className="item-list">
              <img src={rectangle}></img>
              <div
                className="text-item"
                onClick={handleButtonClick}
              >{`New ${name}`}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
