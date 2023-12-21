import DropDown from "../DropDown/DropDown";
import ColorPicker from "../ColorPicker/ColorPicker";

const AddNew = ({
  projectName,
  handeleProjectName,
  name,
  database,
  isDatabaseProjects,
  handleProjectClick,
  handleNew,
  handeleNewProject,
  saveData,
  color,
  setColor,
  viewDropDown,
  viewColor,
}) => {
  return (
    <div className="main-item">
      <div className="newproject-container">
        <div className="newproject-heder">
          <div className="text">Add new {name}</div>
          <div className="line"></div>
        </div>
        <div className="project-input">
          <form>
            <label className="project-input-label">{name} Name</label>
            <input
              type="text"
              name="project"
              placeholder={projectName}
              className="project-input-container"
              onChange={handeleProjectName}
            ></input>
          </form>
        </div>
        {viewDropDown && (
          <div className="project-input">
            <DropDown
              name={name}
              database={database}
              isDatabaseProjects={isDatabaseProjects}
              handleProjectClick={handleProjectClick}
              handleNew={handleNew}
            />
          </div>
        )}
        {viewColor && (
          <div className="project-input">
            <ColorPicker color={color} setColor={setColor} />
            {/* <form>
              <label className="project-input-label">Select Color</label>
              <input
                type="color"
                value={color}
                className="project-input-container"
                onChange={(e) => setColor(e.target.value)}
              ></input>
            </form> */}
          </div>
        )}

        <div className="project-bottom project-input">
          <div className="buttons-frame">
            <button className="button" onClick={handeleNewProject}>
              Cancel
            </button>
            <button className="button" onClick={(e) => saveData(e)}>
              Add {name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
