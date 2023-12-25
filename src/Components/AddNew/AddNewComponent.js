import React, { useState } from "react";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";
import DropDown from "../DropDown/DropDown";

const AddNewComponent = ({ componentData }) => {
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

  const handleChange = (e) => {
    // console.log("event", e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="main-add-component ">
      <div className="newproject-heder">
        <div className="text">Add Component</div>
        {/* <div className="line"></div> */}
      </div>
      <div className="project-input-drop">
        <DropDown
          name={"Component"}
          database={componentData[0].Data}
          isDatabaseProjects={true}
          // handleProjectClick={handleTemplateClick}
          // handleNew={handeleNewTemplate}
        />
      </div>
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
      </div>

      <div className="project-bottom">
        <div className="buttons-frame">
          <button className="button">Cancel</button>
          <button className="button">Add project</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewComponent;
