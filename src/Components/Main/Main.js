import React, { useState } from "react";
// import "./main.css";
import Summary from "../Summary/Summary";
import Database from "../Databasse/Database";
import Case from "../Case/Case";

const Main = () => {
  const [projectId, setProjectId] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const [viewAddTemplate, setViewAddTemplate] = useState(false);
  const [viewSummary, setViewSummary] = useState(true);
  const [viewDatabase, setViewDatabase] = useState(true);
  const [viewCase, setViewCase] = useState(true);

  const NewTemplate = (e) => {
    if (e === "New Template") {
      setViewAddTemplate(true);
    }
  };

  const CloseSummary = () => {
    setViewDatabase(!viewDatabase);
  };

  const CloseDatabase = () => {
    setViewDatabase(!viewDatabase);
  };
  const CloseCase = () => {
    setViewCase(!viewCase);
  };

  return (
    <div className="main-con">
      <Summary
        NewTemplate={NewTemplate}
        setProjectId={setProjectId}
        setCaseId={setCaseId}
        viewSummary={viewSummary}
        CloseSummary={CloseSummary}
      />
      <Database CloseDatabase={CloseDatabase} viewDatabase={viewDatabase} />
      <Case
        projectId={projectId}
        caseId={caseId}
        viewCae={viewCase}
        CloseCase={CloseCase}
        // ref={componentRef}
      />
    </div>
  );
};

export default Main;
