import "./App.css";
import NavigationBar from "./Components/Navigation/NavigationBar";
import SideNav from "./Components/Navigation/SideNav";

function App() {
  return (
    <div className="appcontainer">
      <div className="navigationbar">
        <NavigationBar />
      </div>
      <div className="sidebar">
        <SideNav />
      </div>
      <div className="maincontainer">Main</div>
    </div>
  );
}

export default App;
