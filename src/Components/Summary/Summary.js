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
import DropDown from "../DropDown/DropDown";
import PaginationTable from "../Table/PaginationTable";
import ProjectsTable from "../Table/ProjectsTable";
import TemplateTable from "../Table/TemplateTable";
import add from "./add.png";
import AddNew from "../AddNew/AddNew";

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
  const {
    templates,
    addNewTemplate,
    removeTemplate,
    addDataToTemplate,
    removeDataFromTemplate,
  } = useTemplate();
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
  const [newTemplate, setNewTemplate] = useState(false);

  const [viewAddCase, setViewAddCase] = useState(false);
  const [caseCaseName, setCaseCaseName] = useState("Enter Case Name");

  const [databaseSummryUpdate, setDatabaseSummryUpdate] =
    useState(databaseProjects);
  console.log("databaseSummryUpdate", databaseSummryUpdate);

  // const [databaseProjectUpdate, setDatabaseProjectUpdate] =
  //   useState(DatabaseProject);

  //Template useStates

  const [databaseTemplateFiltered, setDatabaseTemplateFiltered] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(false);
  const [templateName, setTemplatename] = useState("");
  const [viewAddTemplateName, setViewAddTemplateName] = useState(true);
  const [viewSelectTemplate, setViewSelectTemplate] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState("Select template name");
  const [color, setColor] = useState("#ffffff"); // Set initial color to white
  const [componentDescription, setComponentDescription] = useState(
    "Enter Component name"
  );
  const [viewAddTemplateComponent, setViewAddTemplateComponent] =
    useState(false);

  const [databaseTemplateUpdate, setDatabaseTemplateUpdate] =
    useState(templates);
  console.log("databaseTemplateFiltered", databaseTemplateFiltered);

  useEffect(() => {
    const dataT = JSON.parse(window.localStorage.getItem("databasesT"));
    console.log("dataT", dataT);
    if (dataT) {
      setDatabaseTemplateUpdate(dataT[0]);
      // setDatabaseProjectUpdate(data[1]);
    }
  }, []);
  console.log("useEffect DatabaseTemplateUpdate", databaseTemplateUpdate);

  useEffect(() => {
    const databasesT = [databaseTemplateUpdate];
    window.localStorage.setItem("databasesT", JSON.stringify(databasesT));
  }, [databaseTemplateUpdate]);

  const databaseTemplateIsupdate = () => {
    if (templates.length > 0) {
      // setIsdatabaseProjects(true);
      setDatabaseTemplateUpdate(templates);
    }
  };
  useEffect(() => {
    databaseTemplateIsupdate();
  }, [templates]);

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
    if (caseCaseName !== "" && caseCaseName !== "Enter Case Name") {
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
      toast("Add Case  Name", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  const handleViewAddCase = () => {
    setViewAddCase(!viewAddCase);
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
    console.log("delete project ID", e);
    removeProject(e);
  };

  console.log("databaseSummryFiltered after Revmove", databaseSummryFiltered);

  const saveData = (e) => {
    console.log("save data parameters", projectName, projectTemplate);
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
    console.log("HandeleProjectName test", e.target.value);
    setProjectName(e.target.value);
  };

  const handeleProjectTemplate = (e) => {
    setProjectTemplate(e);
  };

  const handleSelectProjectname = (e) => {
    console.log("Selected project", e);
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

  const handleProjectClick = (projectName) => {
    // Call your functions with the projectName parameter
    DatabaseFilter(projectName);
    handleSelectProjectname(projectName);
  };

  const handleTemplateClick = (templateName) => {
    TemplateFilter(templateName);
    setProjectTemplate(templateName);
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

  const handeleNewProject = () => {
    setNewProject(!newProject);
  };

  const handeleNewTemplate = () => {
    setNewTemplate(!newTemplate);
  };

  const TemplateFilter = (e) => {
    console.log("templete filter event", e);
    if (e !== "New Template" && e !== "Select template name") {
      console.log("templete selected", e);
      setDatabaseTemplateFiltered(
        databaseTemplateUpdate.filter((data) => data.TemplateName === e)
      );
      setTemplateSelected(true);
      setViewAddTemplateName(false);
    } else {
      console.log("New template selected");
      setTemplateSelected(false);
      setViewAddTemplateName(true);
      setViewSelectTemplate(false);
      setSelectTemplate("Select template name");
      console.log("templateSelected", templateSelected);
    }
  };

  const RemoveComponent = (e) => {
    let obj = databaseTemplateFiltered[0].Data.find((o) => o.Index === e);
    let index = databaseTemplateFiltered[0].Data.indexOf(obj);
    let update = databaseTemplateFiltered;
    const templateID = databaseTemplateFiltered[0].ID;
    const dataIndex = e;

    console.log("templateID,dataIndex:", templateID, dataIndex);

    if (index > -1) {
      update[0].Data.splice(index, 1);
    }

    console.log("update", update);

    console.log("index", index);
    // alert(`Case ${e} removed`);
    console.log("remove obj", obj);
    setDatabaseTemplateFiltered(update);
    removeDataFromTemplate(templateID, dataIndex);
  };

  const AddTemplate = (e) => {
    e.preventDefault();
    if (templateName === "Enter Template Name" || templateName === "") {
      toast("Template name is missing", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    } else {
      const arrObjIds = databaseTemplateUpdate.map((elements) => {
        return elements.ID;
      });
      const lastID = Math.max(...arrObjIds);
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }
      console.log("Template arrObjIds", arrObjIds);
      e.preventDefault();
      addNewTemplate({
        ID: newID,
        TemplateName: templateName,
        Data: [],
      });
      // databaseTemplateUpdate.push({
      //   TemplateName: templateName,
      //   Data: [],
      // });

      setViewAddTemplateName(false);
      //   setViewAddComponent(false);
      setViewSelectTemplate(true);
      // const DatabaseUpdate2 = databaseSummryUpdate;
      // setDatabaseSummryUpdate(DatabaseUpdate2);
      // console.log("DatabaseUpdate2", DatabaseUpdate2);
      // setProjectName("Enter project name");
      // setProjectTemplate("Select project template");
      // setNewProject(false);
    }
  };
  const handleTemplateName = (e) => {
    e.preventDefault();
    setTemplatename(e.target.value);
  };
  const RemoveTemplate = (e) => {
    removeTemplate(e);
  };

  const handeleNewTemplateComponent = () => {
    setViewAddTemplateComponent(!viewAddTemplateComponent);
  };

  const handleCaseDescriptionChange = (e) => {
    e.preventDefault();
    setComponentDescription(e.target.value);
  };

  const AddComponent = (e) => {
    e.preventDefault();
    console.log("Inside AddComponent", componentDescription, color);
    if (componentDescription !== "" && color !== "") {
      const index = databaseTemplateUpdate.findIndex(
        (x) => x.TemplateName === projectTemplate
      );
      console.log("index", index);
      const lastID = Math.max(
        ...databaseTemplateUpdate[index].Data.map((o) => o.Index)
      );
      const TemplateName = databaseTemplateUpdate[index].TemplateName;
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      console.log("lastID", lastID);

      const id = index + 1;

      addDataToTemplate(id, {
        Index: newID,
        ComponentName: componentDescription,
        Color: color,
      });

      const nComponent = {
        Index: newID,
        ComponentName: componentDescription,
        Color: color,
      };

      databaseTemplateUpdate[index].Data.push(nComponent);
      // const DatabaseUpdateT = databaseTemplateUpdate;
      setComponentDescription("");
      setColor("");
      TemplateFilter(TemplateName);

      // setDatabaseTemplateUpdate(DatabaseUpdateT);
      // console.log("test new component");
      handeleNewTemplateComponent();
    } else {
      toast("Add description and color", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  // console.log("caseCaseName", caseCaseName);

  // useEffect(() => {
  //   setDatabaseSummryFiltered(databaseSummryFiltered);
  // }, [databaseSummryFiltered]);
  return (
    <div className="main-container">
      {/* Your grid content for Main */}
      <div className="main-item">
        <ToastContainer transition={Bounce} autoClose={2000} />
        <DropDown
          name={"Project"}
          database={databaseSummryUpdate}
          isDatabaseProjects={isDatabaseProjects}
          handleProjectClick={handleProjectClick}
          Remove={RemoveProject}
          handleNew={handeleNewProject}
        />
        <DropDown
          name={"Template"}
          database={databaseTemplateUpdate}
          isDatabaseProjects={isDatabaseProjects}
          handleProjectClick={handleTemplateClick}
          handleNew={handeleNewTemplate}
          Remove={RemoveTemplate}
        />
      </div>
      {newProject && (
        <div className="main-item">
          <div className="newproject-container">
            <div className="newproject-heder">
              <div className="text">Add new project</div>
              <div className="line"></div>
            </div>
            <div className="project-input">
              <form>
                <label className="project-input-label">Project Name</label>
                <input
                  type="text"
                  name="project"
                  placeholder={projectName}
                  className="project-input-container"
                  onChange={handeleProjectName}
                ></input>
              </form>
            </div>
            <div className="project-input">
              <DropDown
                name={"Template"}
                database={databaseTemplateUpdate}
                isDatabaseProjects={isDatabaseProjects}
                handleProjectClick={handleTemplateClick}
                handleNew={handeleNewTemplate}
              />
            </div>

            <div className="project-bottom project-input">
              <div className="buttons-frame">
                <button className="button" onClick={handeleNewProject}>
                  Cancel
                </button>
                <button className="button" onClick={(e) => saveData(e)}>
                  Add project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {newTemplate && (
        <div className="main-item">
          <form>
            <div className="newproject-container">
              <div className="newproject-heder">
                <div className="text">Add new template</div>
                <div className="line"></div>
              </div>
              <div className="project-input">
                <label className="project-input-label">Template Name</label>
                <input
                  type="text"
                  name="project"
                  placeholder="Enter template name"
                  className="project-input-container"
                  onChange={handleTemplateName}
                ></input>
              </div>

              <div className="project-bottom project-input">
                <div className="buttons-frame">
                  <button className="button" onClick={handeleNewTemplate}>
                    Cancel
                  </button>
                  <button className="button" onClick={AddTemplate}>
                    Add template
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {projectSelected && (
        <div className="main-item">
          <div className="template-container">
            <div className="button-add" onClick={handleViewAddCase}>
              <img src={add}></img>Add Case
            </div>
            <ProjectsTable
              projectSelected={projectSelected}
              databaseSummryFiltered={databaseSummryFiltered}
              SelectCase={SelectCase}
              RemoveCase={RemoveCase}
            />
          </div>
        </div>
      )}
      {templateSelected && (
        <div className="main-item">
          <>
            <div className="template-container">
              <div className="button-add" onClick={handeleNewTemplateComponent}>
                <img src={add}></img>Add Component
              </div>
              <TemplateTable
                databaseTemplateFiltered={databaseTemplateFiltered}
                templateSelected={templateSelected}
                RemoveComponent={RemoveComponent}
              />
            </div>
          </>
        </div>
      )}
      {viewAddTemplateComponent && (
        <div className="main-item">
          <AddNew
            projectName={componentDescription}
            name={"Component"}
            handeleProjectName={handleCaseDescriptionChange}
            handeleNewProject={handeleNewTemplateComponent}
            saveData={AddComponent}
            color={color}
            setColor={setColor}
            viewDropDown={false}
            viewColor={true}
          />
        </div>
      )}
      {viewAddCase && (
        <div className="main-item">
          <AddNew
            projectName={caseCaseName}
            name={"Case"}
            handeleProjectName={handleCaseNameChange}
            handeleNewProject={handleViewAddCase}
            saveData={AddCase}
            viewDropDown={false}
            viewColor={false}
          />
        </div>
      )}
    </div>
  );
};

export default Summary;
