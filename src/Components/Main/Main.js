import React, { useState } from "react";
// import "./main.css";
import Summary from "../Summary/Summary";
import Database from "../Databasse/Database";

const Main = () => {
  const [projectId, setProjectId] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const [viewAddTemplate, setViewAddTemplate] = useState(false);
  const [viewDatabase, setViewDatabase] = useState(true);

  const NewTemplate = (e) => {
    if (e === "New Template") {
      setViewAddTemplate(true);
    }
  };

  const CloseDatabase = () => {
    setViewDatabase(false);
  };

  return (
    <div className="main-con">
      <Summary
        NewTemplate={NewTemplate}
        setProjectId={setProjectId}
        setCaseId={setCaseId}
      />
      {viewDatabase && <Database CloseDatabase={CloseDatabase} />}
    </div>
  );
};

export default Main;
