import React, { useState } from "react";
import updown from "./up-down.png";
import rectangle from "./Rectangle.png";
import del from "./Delete.png";

const Dropdown = ({
  name,
  database,
  isDatabaseProjects,
  handleProjectClick,
  RemoveProject,
}) => {
  const [viewItems, setViewItems] = useState(false);

  const toggleDown = () => {
    setViewItems(!viewItems);
  };

  console.log("Dropdown database", database, isDatabaseProjects);

  return (
    <div className="dropdown-menu">
      <div className="drop-container">
        <div className="label">{`${name}s`}</div>
        <div className="dropdown-box">
          <div className="drop-text">{`Select ${name} name`}</div>
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
                    onClick={() =>
                      handleProjectClick(
                        name === "Project" ? n.ProjectName : n.TemplateName
                      )
                    }
                  >
                    {n.ProjectName}
                  </div>
                  <img
                    src={del}
                    onClick={() => {
                      RemoveProject(n.ID);
                    }}
                  ></img>
                </div>
              </div>
            ))}
          <div className="item-content">
            <div className="item-list">
              <img src={rectangle}></img>
              <div className="text-item">{`New ${name}`}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
