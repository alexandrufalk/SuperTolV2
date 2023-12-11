import React, { useState, useEffect } from "react";
import "./Summary.css";
import updown from "./up-down.png";
import rectangle from "./Rectangle.png";
import del from "./Delete.png";
import background from "../LogIn/backgrounfg2.jpg";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";
import useTemplate from "../../Hooks/useTemplate";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Summary = ({ NewTemplate, setProjectId, setCaseId }) => {
  const [viewItems, setViewItems] = useState(false);
  const toggleDown = () => {
    setViewItems(!viewItems);
  };
  const {
    databaseProjects,
    addNewProject,
    removeProject,
    addNewCase,
    removeCase,
  } = useDatabaseProjects();
  const { templates } = useTemplate();
  console.log("loaded databaseProjects:", databaseProjects);

  console.log("loaded templates:", templates);
  const [isDatabaseProjects, setIsdatabaseProjects] = useState(false);
  console.log("databaseProjects", databaseProjects);
  const [projectName, setProjectName] = useState("Enter project name");
  const [projectTemplate, setProjectTemplate] = useState(
    "Select project template"
  );
  const [selectProject, setSelectproject] = useState("Select project name");

  //to update cases when one is removed
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [databaseSummryFiltered, setDatabaseSummryFiltered] = useState([]);
  // const {
  //   databaseSummryFiltered,
  //   setDatabaseSummryFiltered,
  //   projectSelected,
  //   setProjectSelected,
  // } = useSharable();
  const [projectSelected, setProjectSelected] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [viewAddCase, setViewAddCase] = useState(false);
  const [caseCaseName, setCaseCaseName] = useState("");

  // const DatabaseSummry = [
  //   {
  //     ProjectName: "Test Name1",
  //     TemplateName: "Test Template1",
  //     DataCase: [
  //       {
  //         ID: 1,
  //         CaseName: "Case1",
  //         Description: "Gap housing-cover",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //       {
  //         ID: 2,
  //         CaseName: "Case2",
  //         Description: "Gap housing-PCB",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //       {
  //         ID: 3,
  //         CaseName: "Case3",
  //         Description: "Gap PCB-cover",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //     ],
  //   },
  //   {
  //     ProjectName: "Test Name2",
  //     TemplateName: "Test Template2",
  //     DataCase: [
  //       {
  //         ID: 1,
  //         CaseName: "Case1",
  //         Description: "Gap housing-cover",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //       {
  //         ID: 2,
  //         CaseName: "Case2",
  //         Description: "Gap housing-PCB",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //       {
  //         ID: 3,
  //         CaseName: "Case3",
  //         Description: "Gap PCB-cover",
  //         Author: "Alex",
  //         Date: "Data",
  //       },
  //     ],
  //   },
  // ];
  // const DatabaseTemplateName = [
  //   {
  //     TemplateName: "Test Template1",
  //     Data: [
  //       {
  //         Index: 1,
  //         ComponentName: "Housing",
  //         Color: "Blue",
  //       },
  //       {
  //         Index: 2,
  //         ComponentName: "Cover",
  //         Color: "Red",
  //       },
  //       {
  //         Index: 3,
  //         ComponentName: "PCB",
  //         Color: "Green",
  //       },
  //     ],
  //   },
  //   {
  //     TemplateName: "Test Template2",
  //     Data: [
  //       {
  //         Index: 1,
  //         ComponentName: "Cover",
  //         Color: "Blue",
  //       },
  //       {
  //         Index: 2,
  //         ComponentName: "Housing",
  //         Color: "Red",
  //       },
  //       {
  //         Index: 3,
  //         ComponentName: "Connector",
  //         Color: "Green",
  //       },
  //     ],
  //   },
  // ];

  // const DatabaseProject = [
  //   {
  //     ProjectName: "Test Name1",
  //     ProjectTemplate: "Test Template1",
  //   },
  //   {
  //     ProjectName: "Test Name2",
  //     ProjectTemplate: "Test Template2",
  //   },
  // ];

  const [databaseSummryUpdate, setDatabaseSummryUpdate] =
    useState(databaseProjects);
  console.log("databaseSummryUpdate", databaseSummryUpdate);

  // const [databaseProjectUpdate, setDatabaseProjectUpdate] =
  //   useState(DatabaseProject);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("databases"));
    console.log("data", data);
    if (data) {
      setDatabaseSummryUpdate(data[0]);
      // setDatabaseProjectUpdate(data[1]);
    }
  }, []);
  console.log("useEffect DatabaseSummryUpdate", databaseSummryUpdate);

  const databaseProjectIsupdate = () => {
    if (databaseProjects.length > 0) {
      setIsdatabaseProjects(true);
      setDatabaseSummryUpdate(databaseProjects);
    }
  };
  useEffect(() => {
    databaseProjectIsupdate();
  }, [databaseProjects]);

  useEffect(() => {
    const databases = [databaseSummryUpdate];
    window.localStorage.setItem("databases", JSON.stringify(databases));
  }, [databaseSummryUpdate]);

  const AddCase = (e) => {
    e.preventDefault();
    if (caseCaseName !== "") {
      const index = databaseSummryUpdate.findIndex(
        (x) => x.ProjectName === selectProject
      );
      const lastID = Math.max(
        ...databaseSummryUpdate[index].DataCase.map((o) => o.ID)
      );
      const ProjectName = databaseSummryUpdate[index].ProjectName;
      console.log("ProjectName when adding case:", ProjectName);
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      console.log("lastID", lastID);
      console.log("index", index);
      const currentDate = new Date(); // Get the current date and time
      const isoFormattedDate = currentDate.toISOString();
      console.log("currentDate:", isoFormattedDate);
      const nCase = {
        ID: newID,
        CaseName: `Case${newID}`,
        Description: caseCaseName,
        Author: "Alex",
        Date: isoFormattedDate,
        CaseData: [],
      };
      const id = index + 1;

      addNewCase(id, {
        ID: newID,
        CaseName: `Case${newID}`,
        Description: caseCaseName,
        Author: "Alex",
      });

      databaseSummryUpdate[index].DataCase.push(nCase);
      // const DatabaseUpdate = databaseSummryUpdate;

      // setDatabaseSummryUpdate(DatabaseUpdate);
      // console.log("test output", DatabaseUpdate);

      setViewAddCase(false);
      setCaseCaseName("");
      // setDatabaseSummryUpdate(databaseProjects);
      console.log("AddCase databaseProjects", databaseProjects);
      DatabaseFilter(ProjectName);

      // console.log("caseCaseName", caseCaseName);
      console.log("databaseSummryUpdate Add Case", databaseSummryUpdate);
    } else {
      toast("Add CaseName", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  const RemoveCase = (e) => {
    let obj = databaseSummryFiltered[0].DataCase.find((o) => o.ID === e);
    let index = databaseSummryFiltered[0].DataCase.indexOf(obj);
    let update = databaseSummryFiltered;
    const projectId = databaseSummryFiltered[0].ID;
    const caseId = e;

    console.log("Summary Case remove ids:", projectId, caseId);

    if (index > -1) {
      update[0].DataCase.splice(index, 1);
    }

    console.log("update", update);

    console.log("index", index);
    // alert(`Case ${e} removed`);
    console.log("remove obj", obj);
    setDatabaseSummryFiltered(update);
    removeCase(projectId, caseId);
  };
  const SelectCase = (e) => {
    const projectId = databaseSummryFiltered[0].ID;
    const caseId = e;

    console.log("Summary Case selext ids:", projectId, caseId);
    setProjectId(projectId);
    setCaseId(caseId);
    scrollToCase();
  };

  const RemoveProject = (e) => {
    removeProject(e);
  };

  console.log("databaseSummryFiltered after Revmove", databaseSummryFiltered);

  const saveData = (e) => {
    e.preventDefault();
    if (
      projectName === "Enter project name" ||
      projectName === "" ||
      projectTemplate === "Select project template"
    ) {
      toast("Project name and template are missing", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    } else {
      const arrObjIds = databaseSummryUpdate.map((elements) => {
        return elements.ID;
      });
      console.log("arrObjIds", arrObjIds);
      const lastID = Math.max(...arrObjIds);
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }
      console.log("newID", newID);
      e.preventDefault();

      addNewProject({
        ID: newID,
        ProjectName: projectName,
        TemplateName: projectTemplate,
        DataCase: [],
        DatabaseDim: [],
      });
      // databaseSummryUpdate.push({
      //   ID: newID,
      //   ProjectName: projectName,
      //   TemplateName: projectTemplate,
      //   DataCase: [],
      // });
      // const DatabaseUpdate2 = databaseSummryUpdate;
      // setDatabaseSummryUpdate(DatabaseUpdate2);
      // console.log("DatabaseUpdate2", DatabaseUpdate2);
      setProjectName("Enter project name");
      setProjectTemplate("Select project template");
      setNewProject(false);
    }
  };
  const handeleProjectName = (e) => {
    setProjectName(e.target.value);
  };

  const handeleProjectTemplate = (e) => {
    setProjectTemplate(e);
  };

  const handleSelectProjectname = (e) => {
    setSelectproject(e);
  };

  console.log("DatabaseSummryFiltered", databaseSummryFiltered);
  console.log("projectSelected", projectSelected);

  console.log("Project Name", projectName);
  console.log("Template Name", projectTemplate);

  const DatabaseFilter = (e) => {
    if (e !== "Select project name" && e !== "New Project") {
      setDatabaseSummryFiltered(
        databaseSummryUpdate.filter((data) => data.ProjectName === e)
      );
      setProjectSelected(true);
      setNewProject(false);
    } else if (e === "New Project") {
      setProjectSelected(false);
      setNewProject(true);
      setSelectproject("Select project name");
    }
  };

  const SetNewCase = (e) => {
    e.preventDefault();
    if (projectSelected) {
      setViewAddCase(true);
    } else {
      toast("Select project name!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };
  const handleCaseNameChange = (e) => {
    e.preventDefault();
    setCaseCaseName(e.target.value);
  };

  const scrollToCase = () => {
    window.scrollTo({
      top: 850,
      behavior: "smooth", // Optional: Smooth scrolling animation
    });
  };
  // console.log("caseCaseName", caseCaseName);

  // useEffect(() => {
  //   setDatabaseSummryFiltered(databaseSummryFiltered);
  // }, [databaseSummryFiltered]);
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
              <div className="item-content">
                <div className="item-list">
                  <img src={rectangle}></img>
                  <div className="text-item">New Project</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="main-item">
        {" "}
        <img src={background} className="background"></img>
      </div>
      <div className="main-item">Item 3</div>
      <div className="main-item">Item 4</div>
      <div className="main-item">Item 5</div>
      <div className="main-item">Item 6</div>
    </div>
  );
};

export default Summary;
