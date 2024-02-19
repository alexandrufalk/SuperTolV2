import React, { useState } from "react";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";
import DropDown from "../DropDown/DropDown";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "./AddNewComponent.css";

const AddNewComponent = ({
  databaseFiltered,
  Database,
  setDatabaseUpdate,
  isTemplate,
  componentData,
  setViewAddComponentData,
}) => {
  const [viewComponents, setViewComponents] = useState("Select Component Name");

  const [viewCustomCpk, setViewCustomCpk] = useState(false);

  const { addNewDim } = useDatabaseProjects();

  // console.log("Is templates?:", isTemplate);

  const [form, setForm] = useState({
    Name: "",
    Description: "",
    DrwNr: "",
    NominalValue: "",
    UpperTolerance: "",
    LowerTolerance: "",
    DistributionType: "",
    ToleranceType: "",
    Color: "",
    Sign: "",
  });

  console.log("AddNewComponet form", form);

  const handleSelectTemplate = (e) => {
    console.log("e from handleSelectTemplate:", e);
    setViewComponents(e);
    filterColor(e);

    setForm((prevForm) => ({
      ...prevForm,
      Name: e,
    }));
  };

  const filterColor = (e) => {
    const obj = componentData[0].Data.find((o) => o.ComponentName === e);
    const index = componentData[0].Data.indexOf(obj);
    const color = componentData[0].Data[index].Color;
    const testcolor = color.toLowerCase();
    console.log("Color from filterColor", testcolor);

    setForm((prevForm) => ({
      ...prevForm,
      Color: testcolor,
    }));
  };

  console.log("AddComponent form", form);

  console.log("AddComponent Template name:", viewComponents);
  const handleCustomCpK = (e) => {
    if (e.target.value === "Normal Cpk Custom") {
      setViewCustomCpk(true);
      console.log("Normal Cpk Custom");
    } else {
      setViewCustomCpk(false);
    }
  };

  const AddComponent = (e) => {
    e.preventDefault();
    console.log("form", form);
    setViewCustomCpk(false);

    if (
      form.Name !== "" &&
      form.Name !== "Select Component" &&
      form.Description !== "" &&
      form.DrwNr !== "" &&
      form.NominalValue !== "" &&
      form.UpperTolerance !== "" &&
      form.LowerTolerance !== "" &&
      form.DistributionType !== "" &&
      form.DistributionType !== "Distribution type" &&
      form.ToleranceType !== "" &&
      form.ToleranceType !== "Select tolerance" &&
      form.Sign !== "" &&
      form.Sign !== "Select Sign" &&
      form.Color !== "" &&
      form.DrwNr !== ""
    ) {
      console.log("Database", databaseFiltered[0].ProjectName);
      const index = Database.findIndex(
        (x) => x.ProjectName === databaseFiltered[0].ProjectName
      );
      console.log("index", index);
      const lastID = Math.max(...Database[index].DatabaseDim.map((o) => o.ID));
      let newID = 0;
      if (lastID === -Infinity) {
        newID = 1;
      } else {
        newID = lastID + 1;
      }

      const id = index + 1;
      console.log("lastID", lastID);
      const nComponent = {
        ID: newID,
        Name: form.Name,
        Description: form.Description,
        UniqueIdentifier: `D${newID}`,
        NominalValue: Number(form.NominalValue),
        UpperTolerance: Number(form.UpperTolerance),
        LowerTolerance: Number(form.LowerTolerance),
        Sign: form.Sign,
        DistributionType: form.DistributionType,
        ToleranceType: form.ToleranceType,
        Color: form.Color,
        DrwNr: form.DrwNr,
      };

      addNewDim(id, nComponent);

      Database[index].DatabaseDim.push(nComponent);
      setDatabaseUpdate([...Database]); // Trigger a shallow copy to notify changes

      console.log("Database Updated", Database);

      resetButton();
    } else {
      toast("Add all informations!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  };

  console.log("Database", Database);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submited:", e);
  };

  const handleChange = (e) => {
    // console.log("event", e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitButton = (e) => {
    e.preventDefault();
    console.log(form);
    setViewCustomCpk(false);
    resetButton();
  };
  const resetButton = () => {
    setForm({
      Name: "",
      Description: "",
      DrwNr: "",
      NominalValue: "",
      UpperTolerance: "",
      LowerTolerance: "",
      DistributionType: "",
      ToleranceType: "",
      Samples: "",
      Color: "",
      Sign: "",
    });
  };
  return (
    <div className="main-add-component ">
      <div className="newproject-heder">
        <div className="text">Add Component</div>
        {/* <div className="line"></div> */}
      </div>
      {isTemplate && (
        <div className="project-input-drop">
          <DropDown
            name={"Component"}
            database={componentData[0].Data}
            isDatabaseProjects={true}
            handleProjectClick={handleSelectTemplate}
            // handleNew={handeleNewTemplate}
            viewNew={false}
          />
        </div>
      )}
      <div className="project-input">
        <div className="project-input-box">
          <label className="project-input-label">Description</label>
          <input
            type="text"
            name="Description"
            placeholder="Enter description"
            className="project-input-container"
            value={form.Description}
            onChange={handleChange}
          ></input>
        </div>
        <div className="project-input-box">
          <label className="project-input-label">Drw.nr</label>
          <input
            type="text"
            name="DrwNr"
            placeholder="Enter drw.nr."
            className="project-input-container"
            value={form.DrwNr}
            onChange={handleChange}
          ></input>
        </div>
        <div className="project-input-box">
          <label className="project-input-label">Nominal Value</label>
          <input
            type="text"
            name="NominalValue"
            placeholder="Enter nominal value"
            className="project-input-container"
            value={form.NominalValue}
            onChange={handleChange}
          ></input>
        </div>
        <div className="project-input-box">
          <label className="project-input-label">Upper Limit</label>
          <input
            type="text"
            name="UpperTolerance"
            placeholder="Enter upper limit"
            className="project-input-container"
            value={form.UpperTolerance}
            onChange={handleChange}
          ></input>
        </div>
        <div className="project-input-box"></div>
        <div className="project-input-box">
          <label className="project-input-label">Lower Limit</label>
          <input
            type="text"
            name="LowerTolerance"
            placeholder="Enter lower limit"
            className="project-input-container"
            value={form.LowerTolerance}
            onChange={handleChange}
          ></input>
        </div>
        <div className="bottom-drop-group">
          <div class="bottom-drop">
            <label for="toleranceType" className="label-drop">
              Select tolerance type
            </label>
            <select
              id="toleranceType"
              class="select-drop"
              name="ToleranceType"
              value={form.ToleranceType}
              onChange={(e) => handleChange(e)}
            >
              <option value="Select tolerance">Select tolerance</option>
              <option value="General Tolerance">General Tolerance</option>
              <option value="Imposed Tolerance">Imposed Tolerance</option>
            </select>
          </div>
          <div class="bottom-drop">
            <label for="distributionType" className="label-drop">
              Select distribution type
            </label>
            <select
              id="distributionType"
              class="select-drop"
              name="DistributionType"
              value={form.DistributionType}
              onChange={(e) => {
                handleChange(e);
                handleCustomCpK(e);
              }}
            >
              <option value="Distribution type">Distribution type</option>
              <option value="Normal Cpk 1">Normal Cpk 1</option>
              <option value="Normal Cpk 1.33">Normal Cpk 1.33</option>
              <option value="Normal Cpk 1.66">Normal Cpk 1.66</option>
              <option value="Normal Cpk 2">Normal Cpk 2</option>
              <option value="Uniform">Uniform</option>
              <option value="Normal Cpk Custom">Normal Cpk Custom</option>
            </select>
          </div>
          {viewCustomCpk && (
            <div className="project-input-box">
              <label className="project-input-label">Custom Cpk</label>
              <input
                type="text"
                name="DistributionType"
                placeholder="Enter Cpk"
                className="project-input-container"
                value={form.LowerTolerance}
                onChange={handleChange}
              ></input>
            </div>
          )}

          <div class="bottom-drop">
            <label for="sign" className="label-drop">
              Select Sign
            </label>
            <select
              id="sign"
              class="select-drop"
              name="Sign"
              value={form.Sign}
              onChange={(e) => handleChange(e)}
            >
              <option value="Select Sign">Select Sign</option>
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          </div>
        </div>
      </div>

      <div className="project-bottom">
        <div className="buttons-frame">
          <button
            className="button"
            onClick={() => {
              setViewAddComponentData();
            }}
          >
            Cancel
          </button>
          <button className="button" onClick={AddComponent}>
            Add Component
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewComponent;
