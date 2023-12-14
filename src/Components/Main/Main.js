import React, { useState } from "react";
// import "./main.css";
import Summary from "../Summary/Summary";

const Main = () => {
  const [projectId, setProjectId] = useState(null);
  const [caseId, setCaseId] = useState(null);
  const [viewAddTemplate, setViewAddTemplate] = useState(false);

  const NewTemplate = (e) => {
    if (e === "New Template") {
      setViewAddTemplate(true);
    }
  };

  return (
    <div className="main-con">
      <Summary
        NewTemplate={NewTemplate}
        setProjectId={setProjectId}
        setCaseId={setCaseId}
      />
    </div>
  );
};

export default Main;
