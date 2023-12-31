import React, { useState, useEffect } from "react";
import "./App.css";
import NavigationBar from "./Components/Navigation/NavigationBar";
import SideNav from "./Components/Navigation/SideNav";
import SelectDrop from "./Components/Main/SelectDrop.tsx";
import Main from "./Components/Main/Main.js";

function App() {
  const CloseDatabase = () => {
    const [viewDatabase, setViewDatabase] = useState(false);
    setViewDatabase(false);
  };
  return (
    <div className="appcontainer">
      <div className="navigationbar">
        <NavigationBar />
      </div>
      <div className="sidebar">
        <SideNav />
      </div>
      <div className="maincontainer">
        <Main />
      </div>
    </div>
  );
}

export default App;
