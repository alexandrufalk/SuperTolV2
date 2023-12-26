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
  viewNew,
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
                      let clickedName;

                      if (name === "Project") {
                        clickedName = n.ProjectName;
                      } else if (name === "Template") {
                        clickedName = n.TemplateName;
                      } else if (name === "Component") {
                        clickedName = n.ComponentName;
                      }

                      handleProjectClick(clickedName);
                      setheaderName(clickedName);
                    }}
                  >
                    {name === "Project" && <span>{n.ProjectName}</span>}
                    {name === "Template" && <span>{n.TemplateName}</span>}
                    {name === "Component" && <span>{n.ComponentName}</span>}
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
          {viewNew && (
            <div className="item-content">
              <div className="item-list">
                <img src={rectangle}></img>
                <div
                  className="text-item"
                  onClick={handleButtonClick}
                >{`New ${name}`}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
