import React, { useState, useEffect } from "react";
import "./database.css";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";
import useTemplate from "../../Hooks/useTemplate";
import { ToastContainer, toast, Bounce } from "react-toastify";
import DropDown from "../DropDown/DropDown";
import AddNewComponent from "../AddNew/AddNewComponent";
import CustomPagination from "../Table/CustomPagination";
import ImageComponent from "../ImageComponent/ImageComponent";
import ImageCropper2 from "../ImageComponent/ImageCropper2";
import add from "../Summary/add.png";
import del from "../DropDown/Delete.png";

const Database = ({ CloseDatabase, viewDatabase }) => {
  const { databaseProjects, removeDim, removeImg } = useDatabaseProjects();
  const [viewAddComponentData, setViewAddComponentData] = useState(false);

  const [databaseFiltered, setDatabaseFiltered] = useState([]);
  const [projectSelected, setProjectSelected] = useState(false);
  const [selectProjectData, setSelectprojectData] = useState(
    "Select project name"
  );
  const [viewCancel, setViewCancel] = useState(false);
  const [viewAddComponent, setViewAddComponent] = useState(true);
  const [templateUpdate, setTemplateUpdate] = useState([]);
  const [isTemplate, setIsTemplate] = useState(false);
  const [componentData, setComponentData] = useState();
  const [isHovered, setIsHovered] = useState(false);

  // console.log("Database", Database);

  const [DatabaseUpdate, setDatabaseUpdate] = useState(databaseProjects);
  const { templates } = useTemplate();

  useEffect(() => {
    const dataU = JSON.parse(window.localStorage.getItem("DatabasesU"));
    console.log("dataU", dataU);
    if (dataU) {
      setDatabaseUpdate(dataU[0]);
      // setDatabaseProjectUpdate(data[1]);
    }
  }, []);
  console.log("useEffect DatabaseUpdate", DatabaseUpdate);
  useEffect(() => {
    templateIsUpdate();
  }, [templates]);

  const templateIsUpdate = () => {
    if (templates.length > 0) {
      setTemplateUpdate(templates);
    }
  };

  const databaseProjectIsupdate = () => {
    if (databaseProjects.length > 0) {
      // setIsdatabaseProjects(true);
      setDatabaseUpdate(databaseProjects);
    }
  };
  useEffect(() => {
    databaseProjectIsupdate();
    console.log("database is updated");
  }, [databaseProjects]);

  useEffect(() => {
    const DatabasesU = [DatabaseUpdate];
    window.localStorage.setItem("DatabasesU", JSON.stringify(DatabasesU));
    console.log("Database was updated");
    if (selectProjectData !== "Select project name") {
      DatabasesFilter(selectProjectData);
    }
  }, [DatabaseUpdate]);

  console.log("Database databaseProjects:", databaseProjects);

  const SetViewAdd = () => {
    if (selectProjectData !== "Select project name") {
      setViewAddComponentData(!viewAddComponentData);
      setViewCancel(true);
      setViewAddComponent(false);
    } else {
      toast("Select Project Name!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  const SetViewAddCancel = () => {
    setViewAddComponentData(false);
    setViewAddComponent(true);
  };
  console.log("DatabaseUpdate", DatabaseUpdate);

  const DatabasesFilter = (e) => {
    if (e !== "Select project name" && e !== "New Project") {
      setDatabaseFiltered(
        DatabaseUpdate.filter((data) => data.ProjectName === e)
      );
      setProjectSelected(true);
      // setNewProject(false);
    } else {
      console.log("Error");
    }
  };
  const handleSelectProjectnameData = (e) => {
    setSelectprojectData(e);
  };

  console.log("databaseFiltered", databaseFiltered);

  const TemplateComponentFiltered = () => {
    const TemplateN = databaseFiltered[0].TemplateName;
    const filteredTemplate = templateUpdate.filter(
      (data) => data.TemplateName === TemplateN
    );
    console.log("TemplateN", TemplateN);
    console.log("TemplateComponentFiltered", filteredTemplate);
    if (filteredTemplate.length > 0) {
      setComponentData(filteredTemplate);
      setIsTemplate(true);
    }
  };

  const RemoveDim = (e) => {
    let obj = databaseFiltered[0].DatabaseDim.find((o) => o.ID === e);
    let index = databaseFiltered[0].DatabaseDim.indexOf(obj);
    let update = databaseFiltered;
    const projectId = databaseFiltered[0].ID;
    const dimId = e;

    console.log("Dim remove ids:", projectId, dimId);

    if (index > -1) {
      update[0].DatabaseDim.splice(index, 1);
    }

    console.log("update", update);

    console.log("index", index);
    // alert(`Case ${e} removed`);
    console.log("remove obj", obj);
    setDatabaseFiltered(update);
    removeDim(projectId, dimId);
  };

  const CallDatabasesFilter = () => {
    setDatabaseUpdate(databaseProjects);
    DatabasesFilter(selectProjectData);
  };

  const handleClick = (projectId, dimId, idImg) => {
    removeImg(projectId, dimId, idImg);
    // Call your function here with the imageID
    console.log(
      `Clicked on image with ID: ${idImg}, projectID ${projectId}, dimID ${dimId} `
    );
  };

  const handleProjectClick = (e) => {
    // Call your functions with the projectName parameter
    DatabasesFilter(e);

    handleSelectProjectnameData(e);
  };

  //Paginatio

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isDropPag, setDropPag] = useState(false);

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projectSelected
    ? databaseFiltered[0].DatabaseDim.slice(indexOfFirstItem, indexOfLastItem)
    : false;
  console.log(
    "Pagination items",
    indexOfFirstItem,
    indexOfLastItem,
    currentItems
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePaginationNr = () => {
    setDropPag(!isDropPag);
  };

  return (
    <div className="main-container-database">
      <div className="database-header">
        <p className="fs-3 ">Database</p>

        {viewDatabase && <button onClick={CloseDatabase}>X</button>}
        {!viewDatabase && <button onClick={CloseDatabase}>ᐁ</button>}
      </div>
      {viewDatabase && (
        <>
          <div className="main-item-database">
            <DropDown
              name={"Project"}
              database={DatabaseUpdate}
              isDatabaseProjects={true}
              handleProjectClick={handleProjectClick}
              //   Remove={RemoveProject}
              //   handleNew={handeleNewProject}
            />
            {viewAddComponentData && (
              <AddNewComponent
                databaseFiltered={databaseFiltered}
                Database={DatabaseUpdate}
                isTemplate={isTemplate}
                // viewAddComponentData={viewAddComponentData}
                setDatabaseUpdate={setDatabaseUpdate}
                componentData={componentData}
                setViewAddComponentData={setViewAddComponentData}
              />
            )}

            {/* <div className="main-add-component ">
          <div className="newproject-heder">
            <div className="text">Add Component</div>
            <div className="line"></div>
          </div>
          <div className="project-input">
            <div className="project-input-box">
              <label className="project-input-label">Description</label>
              <input
                type="text"
                name="project"
                placeholder="Enter description"
                className="project-input-container"
                //   onChange={handeleProjectName}
              ></input>
            </div>
            <div className="project-input-box">
              <label className="project-input-label">Drw.nr</label>
              <input
                type="text"
                name="project"
                placeholder="Enter drw.nr."
                className="project-input-container"
                //   onChange={handeleProjectName}
              ></input>
            </div>
            <div className="project-input-box">
              <label className="project-input-label">Nominal Value</label>
              <input
                type="text"
                name="project"
                placeholder="Enter nominal value"
                className="project-input-container"
                //   onChange={handeleProjectName}
              ></input>
            </div>
            <div className="project-input-box">
              <label className="project-input-label">Upper Limit</label>
              <input
                type="text"
                name="project"
                placeholder="Enter upper limit"
                className="project-input-container"
                //   onChange={handeleProjectName}
              ></input>
            </div>
            <div className="project-input-box"></div>
            <div className="project-input-box">
              <label className="project-input-label">Lower Limit</label>
              <input
                type="text"
                name="project"
                placeholder="Enter lower limit"
                className="project-input-container"
                //   onChange={handeleProjectName}
              ></input>
            </div>
          </div>
          <div className="project-input">
            <DropDown
              // name={"Template"}
              database={[1, 2, 3]}
              // isDatabaseProjects={isDatabaseProjects}
              // handleProjectClick={handleTemplateClick}
              // handleNew={handeleNewTemplate}
            />
          </div>

          <div className="project-bottom">
            <div className="buttons-frame">
              <button className="button">Cancel</button>
              <button className="button">Add project</button>
            </div>
          </div>
        </div> */}

            <ToastContainer transition={Bounce} autoClose={2000} />
          </div>
          {projectSelected && (
            <div className="main-item-database2">
              <div className="template-container">
                <div className="table-top">
                  <CustomPagination
                    data={databaseFiltered[0].DatabaseDim}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                  <div
                    className="button-add"
                    onClick={() => {
                      SetViewAdd();
                      TemplateComponentFiltered();
                    }}
                  >
                    <img src={add}></img>Add Component
                  </div>
                </div>
                <table id="Database">
                  <thead>
                    <tr>
                      <th className="first-th">Index</th>
                      {currentItems.map((n, index) => (
                        <td
                          key={n.ID + "Database"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                            borderTopRightRadius:
                              index === currentItems.length - 1 ? "20px" : "0",
                          }}
                        >
                          {n.ID}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Name</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.Name}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {" "}
                          {n.Name}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Description</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.Description}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.Description}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Unique Identifier</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.UniqueIdentifier}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.UniqueIdentifier}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Drw. nr.</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.DrwNr}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.DrwNr}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Nominal Value</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + "NominalValue"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.NominalValue}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Upper Tolerance</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.UpperTolerance}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.UpperTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Lower Tolerance</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.LowerTolerance}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.LowerTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Upper Limit</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.NominalValue + n.UpperTolerance}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {(n.NominalValue + n.UpperTolerance).toFixed(3)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Lower Limit</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.NominalValue + n.LowerTolerance}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {(n.NominalValue + n.LowerTolerance).toFixed(3)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Tolerance Range</th>
                      {currentItems.map((n) => (
                        <td
                          key={
                            n.ID + n.UpperTolerance + "minu" + n.LowerTolerance
                          }
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.UpperTolerance - n.LowerTolerance}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Sign</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + "Sign"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.Sign}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Distribution Type</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.DistributionType}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {" "}
                          {n.DistributionType}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Tolerance Type</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + n.ToleranceType}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {n.ToleranceType}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Standard Deviation</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + "Std"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {Math.round(
                            ((n.UpperTolerance - n.LowerTolerance) /
                              (6 *
                                parseFloat(
                                  n.DistributionType.replace(/[^\d.]*/g, "")
                                )) +
                              Number.EPSILON) *
                              100
                          ) / 100}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th>Mean</th>
                      {currentItems.map((n) => (
                        <td
                          key={n.ID + "Mean"}
                          style={{
                            color: n.Color ? n.Color.toLowerCase() : "inherit",
                          }}
                        >
                          {(
                            (n.NominalValue +
                              n.UpperTolerance +
                              n.NominalValue +
                              n.LowerTolerance) /
                            2
                          ).toFixed(3)}
                        </td>
                      ))}
                    </tr>
                    {/* <tr>
                <th>Drawing</th>
                {databaseFiltered[0].DatabaseDim.map((n) => (
                  <td key={n.ID + "Drawing"}>
                    <td>
                      <div className="addImage">
                        <ImageCropper2
                          projectID={databaseFiltered[0].ID}
                          dimID={n.ID}
                          setDatabaseFiltered={setDatabaseFiltered}
                          databaseFiltered={databaseFiltered}
                        />
                      </div>
                    </td>
                    <td>
                      {n.Image.map((i) => (
                        <ImageComponent
                          key={i.ID}
                          i={i}
                          handleClick={() => {
                            handleClick(databaseFiltered[0].ID, n.ID, i.ID);
                          }}
                        />
                      ))}
                    </td>
                  </td>
                ))}
              </tr> */}

                    <tr>
                      <th className="last-th">Action</th>
                      {currentItems.map((n, index) => (
                        <td
                          key={n.ID + "Remove case summary"}
                          style={{
                            borderBottomRightRadius:
                              index === currentItems.length - 1 ? "20px" : "0",
                          }}
                        >
                          {/* <button
                            type="button"
                            variant="outline-danger"
                            onClick={() => {
                              RemoveDim(n.ID);
                              
                            }}
                          >
                            X
                          </button> */}
                          <img
                            src={del}
                            onClick={() => {
                              const confirmRemove = window.confirm(
                                "Do you want to remove this component?"
                              );
                              if (confirmRemove) {
                                RemoveDim(n.ID);
                              }
                            }}
                          ></img>
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* <DropdownButton
        title={selectProjectData}
        onSelect={(e) => {
          DatabasesFilter(e);

          handleSelectProjectnameData(e);
        }}
        variant="secondary"
      >
        
        <div className="p-2 bg-dark bg-gradient text-white rounded shadow-lg">
          {DatabaseUpdate.map((n) => (
            <Dropdown.Item
              eventKey={n.ProjectName}
              key={n.ProjectName}
              className="text-info dropdown-project"
            >
              {n.ProjectName}
            </Dropdown.Item>
          ))}
        </div>
        
      </DropdownButton> */}

      {/* <div className="main-item-database">
        <div className="add-component-database">
          <div className="add-header">Add Component</div>
        </div>
      </div> */}

      {/* {viewAddComponentData && (
        <Row>
          <AddComponent
            databaseFiltered={databaseFiltered}
            Database={DatabaseUpdate}
            isTemplate={isTemplate}
            // viewAddComponentData={viewAddComponentData}
            setDatabaseUpdate={setDatabaseUpdate}
            componentData={componentData}
          />
          {viewCancel && (
            <div className="d-flex justify-content-between">
              <button
                variant="danger"
                className="px-2"
                onClick={SetViewAddCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </Row>
      )} */}

      {/* {viewAddComponent && (
        <div className="main-item-database">
          <button
            variant="secondary"
            type="submit"
            className="m-2"
            onClick={() => {
              SetViewAdd();
              TemplateComponentFiltered();
            }}
          >
            Add component
          </button>
        </div>
      )} */}
    </div>
  );
};
export default Database;
