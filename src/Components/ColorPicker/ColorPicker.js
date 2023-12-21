import React, { useState } from "react";

const ColorPicker = ({ color, setColor }) => {
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className="project-input">
      <label htmlFor="colorPicker" className="label">
        Choose a color:
      </label>
      <input
        style={{
          width: "100px",
          height: "30px",
          backgroundColor: color,
        }}
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleColorChange}
      />

      {/* <div style={{ marginTop: "20px" }}>
        <p>Selected color: {color}</p>
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: color,
          }}
        ></div>
      </div> */}
    </div>
  );
};

export default ColorPicker;
